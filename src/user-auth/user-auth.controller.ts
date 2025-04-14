import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { RegisterDto } from './dto/register-user.dto';
import { UpdateUserAuthDto } from './dto/update-user-auth.dto';
import { LoginDto } from './dto/login-user-dto';

@Controller('user-auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) { }

  @Post('register')
  register(@Body() createUserAuthDto: RegisterDto) {
    return this.userAuthService.register(createUserAuthDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.userAuthService.login(loginDto);
  }

  @Post(':id')
  activate(@Body() body: { phone: string, otp: string }) {
    return this.userAuthService.activate(body.phone, body.otp);
  }
}
