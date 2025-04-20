import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register-user.dto';
import { UpdateUserAuthDto } from './dto/update-user-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt"
import { EskizService } from 'src/eskiz/eskiz.service';
import { totp } from 'otplib';
import { USER_STATUS } from 'generated/prisma';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-user-dto';
import { Request } from 'express';

@Injectable()
export class UserAuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eskizService: EskizService,
    private readonly jwtService: JwtService
  ) {
    totp.options = { step: 600, digits: 6 }
  }

  async findUser(phone: string) {
    let user = await this.prisma.user.findUnique({ where: { phone } })
    return user
  }

  async register(registerUserDto: RegisterDto) {
    try {
      const OTP_SECRET = process.env.OTP_SECRET
      let { phone, password } = registerUserDto
      let user = await this.prisma.user.findUnique({ where: { phone } })
      if (user) return new BadRequestException("Already registered!")
      let hashedPassword = await bcrypt.hash(password, 10)
      let newUser = { ...registerUserDto, password: hashedPassword }
      // await this.eskizService.sendSms("Bu Eskiz dan test", phone)
      const otp = await totp.generate(OTP_SECRET!)
      await this.prisma.user.create({ data: newUser })
      return { newUser, otp }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async login(loginDto: LoginDto, req: Request) {
    try {
      let { phone, password } = loginDto

      let user = await this.prisma.user.findUnique({ where: { phone } })

      if (!user) return new NotFoundException("Not found this user, please register")

      if (user.status === USER_STATUS.INACTIVE) return new BadRequestException("Your account is not activated, please activate!")

      let matchPassword = await bcrypt.compare(password, user.password)

      if (!matchPassword) throw new BadRequestException("Wrong credentials!");

      const ip: string = req.ip || 'unknown';

      let session = await this.prisma.session.findFirst({
        where: {
          ip, userId: user.id
        }
      })

      if (!session) {
        await this.prisma.session.create({
          data: { ip, userId: user.id }
        })
      }
      const access_token = await this.generateAccessToken({ id: user.id, role: user.role! });
      const refresh_token = await this.generateRefreshToken({ id: user.id, role: user.role! });

      return {
        access_token,
        refresh_token
      };
    } catch (error) {
      throw new InternalServerErrorException(error, "errror")
    }
  }

  async findAllSessions(req: Request) {
    let id = req['user'].id
    let sessions = await this.prisma.session.findMany({
      where: { userId: id }
    })
    return sessions
  }

  async deleteSession(req: Request, id: string) {
    let deletedSession = await this.prisma.session.delete({ where: { id } })
    return deletedSession
  }

  async me(req: Request) {
    let id = req['user'].id
    let session = await this.prisma.session.findFirst({
      where: { ip: req.ip, userId: id }
    })
    if (!session) {
      throw new UnauthorizedException()
    }
    let user = await this.prisma.user.findFirst({ where: { id } })
    return user
  }

  async activate(phone: string, otp: string) {
    try {
      const OTP_SECRET = process.env.OTP_SECRET
      let user = await this.findUser(phone)
      if (!user) return new NotFoundException("Not found user, please register!")

      if (user.status === USER_STATUS.ACTIVE) return { message: "This user already activated, please login" }

      const isValid = totp.check(otp, OTP_SECRET!)
      if (!isValid) return "Invalid otp"
      await this.prisma.user.update({
        data: { status: USER_STATUS.ACTIVE },
        where: { phone }
      })
      return { message: "Your account successfully activated!" }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async generateAccessToken(payload: { id: string, role: string }) {
    const token = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_SECRET,
      expiresIn: '1d'
    });
    return token;
  }

  async generateRefreshToken(payload: { id: string, role: string }) {
    const token = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_SECRET,
      expiresIn: '30d'
    });
    return token;
  }

  refreshToken(req: Request) {
    let { id, role } = req['user'];
    return { access_token: this.generateAccessToken({ id, role }) };
  }

}
