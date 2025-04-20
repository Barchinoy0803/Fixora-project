import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Get,
  Delete,
} from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { RegisterDto } from './dto/register-user.dto';
import { UpdateUserAuthDto } from './dto/update-user-auth.dto';
import { LoginDto } from './dto/login-user-dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiParam
} from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { Request } from 'express';

@ApiTags('User Auth')
@Controller('user-auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) { }

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  register(@Body() createUserAuthDto: RegisterDto) {
    return this.userAuthService.register(createUserAuthDto);
  }

  
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  login(@Body() loginDto: LoginDto, @Req() req: Request) {
    return this.userAuthService.login(loginDto, req);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'Get current authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'User profile returned successfully',
    schema: {
      example: {
        id: 'user-uuid',
        name: 'John Doe',
        createdAt: '2025-04-20T08:00:00.000Z',
      },
    },
  })
  me(@Req() req: Request) {
    return this.userAuthService.me(req);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('sessions')
  @ApiOperation({ summary: 'Get all active sessions for current user' })
  @ApiResponse({
    status: 200,
    description: 'List of sessions returned successfully',
    schema: {
      example: [
        {
          id: 'session-id-1',
          ip: '192.168.1.1',
          createdAt: '2025-04-19T10:00:00.000Z',
        },
        {
          id: 'session-id-2',
          ip: '10.0.0.1',
          createdAt: '2025-04-20T09:00:00.000Z',
        },
      ],
    },
  })
  sessions(@Req() req: Request) {
    return this.userAuthService.findAllSessions(req);
  }

  @UseGuards(AuthGuard)
  @Delete('session/:id')
  @ApiOperation({ summary: 'Delete a session by ID for current user' })
  @ApiParam({ name: 'id', type: String, description: 'Session ID to delete' })
  @ApiResponse({
    status: 200,
    description: 'Session deleted successfully',
    schema: {
      example: {
        message: 'Session deleted successfully',
        sessionId: 'session-id',
      },
    },
  })
  deleteSession(@Req() req: Request, @Param('id') id: string) {
    return this.userAuthService.deleteSession(req, id);
  }

  @Post('activate')
  @ApiOperation({ summary: 'Activate user by OTP' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        phone: {
          type: 'string',
          example: '+998901234567',
        },
        otp: {
          type: 'string',
          example: '123456',
        },
      },
      required: ['phone', 'otp'],
    },
  })
  @ApiResponse({ status: 200, description: 'User activated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid OTP or phone' })
  activate(@Body() body: { phone: string; otp: string }) {
    return this.userAuthService.activate(body.phone, body.otp);
  }
}
