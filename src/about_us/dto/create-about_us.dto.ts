import { IsNotEmpty, IsString } from "class-validator"

export class CreateAboutUsDto {
    @IsString()
    @IsNotEmpty()
    generalInformation_uz: string

    @IsString()
    @IsNotEmpty()
    generalInformation_ru: string

    @IsString()
    @IsNotEmpty()
    generalInformation_en: string

    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    link: string

    @IsString()
    @IsNotEmpty()
    phone: string
}
