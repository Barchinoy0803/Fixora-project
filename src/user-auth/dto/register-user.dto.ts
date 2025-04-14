import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { ROLE, USER_STATUS } from "generated/prisma"

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    fullname: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsNotEmpty()
    phone: string

    @IsString()
    @IsNotEmpty()
    regionId: string

    @IsString()
    @IsOptional()
    IIN: string

    @IsString()
    @IsOptional()
    MFO: string

    @IsString()
    @IsOptional()
    RS: string

    @IsString()
    @IsOptional()
    BANK: string

    @IsString()
    @IsOptional()
    OKED: string

    @IsString()
    @IsOptional()
    address: string

    @IsEnum(ROLE)
    @IsOptional()
    role: ROLE

    @IsEnum(USER_STATUS)
    @IsOptional()
    status: USER_STATUS
}
