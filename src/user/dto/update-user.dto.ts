import { PartialType } from '@nestjs/mapped-types';
import { RegisterDto } from 'src/user-auth/dto/register-user.dto';

export class UpdateUserDto extends PartialType(RegisterDto) {}
