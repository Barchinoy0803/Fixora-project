import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateProfessionDto {
    @IsString()
    @IsNotEmpty()
    name_uz: string

    @IsString()
    @IsNotEmpty()
    name_ru: string

    @IsString()
    @IsNotEmpty()
    name_en: string

    @IsString()
    @IsNotEmpty()
    image: string

    @IsBoolean()
    @IsOptional()
    isActive: boolean
}
