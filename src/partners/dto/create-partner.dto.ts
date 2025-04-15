import { IsNotEmpty, IsString } from "class-validator"

export class CreatePartnerDto {
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
    image: string
}
