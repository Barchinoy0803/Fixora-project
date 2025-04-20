import { PartialType } from '@nestjs/mapped-types';
import { RegisterDto } from 'src/user-auth/dto/register-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ROLE, USER_STATUS } from 'generated/prisma';

export class UpdateUserDto extends PartialType(RegisterDto) {
  @ApiPropertyOptional({ example: 'Barchinoy Anvar qizi', description: 'Full name of the user' })
  fullname?: string;

  @ApiPropertyOptional({ example: 'secureP@ssword123', description: 'Password for the account' })
  password?: string;

  @ApiPropertyOptional({ example: '+998901234567', description: 'User phone number' })
  phone?: string;

  @ApiPropertyOptional({ example: 'd22b69a8-12a1-4f4b-87cd-e8fa8e541db7', description: 'Region ID' })
  regionId?: string;

  @ApiPropertyOptional({ example: '123456789012', description: 'Individual Identification Number (optional)' })
  IIN?: string;

  @ApiPropertyOptional({ example: '01101', description: 'Bank MFO code (optional)' })
  MFO?: string;

  @ApiPropertyOptional({ example: '20208840123456789001', description: 'Bank RS number (optional)' })
  RS?: string;

  @ApiPropertyOptional({ example: 'Asaka Bank', description: 'Bank name (optional)' })
  BANK?: string;

  @ApiPropertyOptional({ example: '62010', description: 'OKED code (optional)' })
  OKED?: string;

  @ApiPropertyOptional({ example: 'Tashkent, Chilonzor district, 5th block', description: 'User address (optional)' })
  address?: string;

  @ApiPropertyOptional({ enum: ROLE, description: 'User role (optional)' })
  role?: ROLE;

  @ApiPropertyOptional({ enum: USER_STATUS, description: 'User status (optional)' })
  status?: USER_STATUS;
}
