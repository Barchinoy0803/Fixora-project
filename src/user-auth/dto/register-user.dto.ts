import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ROLE, USER_STATUS } from 'generated/prisma';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'Barchinoy Anvar qizi', description: 'Full name of the user' })
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @ApiProperty({ example: 'secureP@ssword123', description: 'Password for the account' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: '+998901234567', description: 'User phone number' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'd22b69a8-12a1-4f4b-87cd-e8fa8e541db7', description: 'Region ID' })
  @IsString()
  @IsNotEmpty()
  regionId: string;

  @ApiPropertyOptional({ example: '123456789012', description: 'Individual Identification Number (optional)' })
  @IsString()
  @IsOptional()
  IIN: string;

  @ApiPropertyOptional({ example: '01101', description: 'Bank MFO code (optional)' })
  @IsString()
  @IsOptional()
  MFO: string;

  @ApiPropertyOptional({ example: '20208840123456789001', description: 'Bank RS number (optional)' })
  @IsString()
  @IsOptional()
  RS: string;

  @ApiPropertyOptional({ example: 'Asaka Bank', description: 'Bank name (optional)' })
  @IsString()
  @IsOptional()
  BANK: string;

  @ApiPropertyOptional({ example: '62010', description: 'OKED code (optional)' })
  @IsString()
  @IsOptional()
  OKED: string;

  @ApiPropertyOptional({ example: 'Tashkent, Chilonzor district, 5th block', description: 'User address (optional)' })
  @IsString()
  @IsOptional()
  address: string;
}
