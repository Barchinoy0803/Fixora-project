import { IsNotEmpty, IsString } from "class-validator"

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsNotEmpty()
    phone: string
}
