import { PartialType } from '@nestjs/mapped-types';
import { RegisterDto } from './register-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ROLE, USER_STATUS } from 'generated/prisma';

export class UpdateUserAuthDto extends PartialType(RegisterDto) {
  @ApiProperty({ example: 'Barchinoy Berdiyeva', required: false })
  fullname?: string;

  @ApiProperty({ example: 'veryStrongPassword123!', required: false })
  password?: string;

  @ApiProperty({ example: '+998901234567', required: false })
  phone?: string;

  @ApiProperty({ example: '1a2b3c-region-id', required: false })
  regionId?: string;

  @ApiProperty({ example: '123456789012', required: false })
  IIN?: string;

  @ApiProperty({ example: '12345', required: false })
  MFO?: string;

  @ApiProperty({ example: '1234567890123456', required: false })
  RS?: string;

  @ApiProperty({ example: 'NBU', required: false })
  BANK?: string;

  @ApiProperty({ example: '62010', required: false })
  OKED?: string;

  @ApiProperty({ example: 'Tashkent, Yunusabad district', required: false })
  address?: string;

  @ApiProperty({ enum: ROLE, required: false })
  role?: ROLE;

  @ApiProperty({ enum: USER_STATUS, required: false })
  status?: USER_STATUS;
}
