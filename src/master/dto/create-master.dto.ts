import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateMasterDto {
    @IsString()
    @IsNotEmpty()
    firstname: string

    @IsString()
    @IsNotEmpty()
    lastname: string

    @IsString()
    @IsNotEmpty()
    phoneNumber: string

    @IsOptional()
    @IsBoolean()
    isActive: boolean

    @IsNumber()
    @IsNotEmpty()
    year: number

    @IsString()
    @IsNotEmpty()
    image: string

    @IsString()
    @IsNotEmpty()
    pasportImage: string

    @IsString()
    @IsNotEmpty()
    about: string
}
