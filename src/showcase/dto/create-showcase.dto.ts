import { IsNotEmpty, IsString } from "class-validator"

export class CreateShowcaseDto {
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
    description_uz: string

    @IsString()
    @IsNotEmpty()
    description_ru: string

    @IsString()
    @IsNotEmpty()
    description_en: string

    @IsString()
    @IsNotEmpty()
    image: string

    @IsString()
    @IsNotEmpty()
    link: string
}
