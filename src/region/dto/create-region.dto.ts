import { IsString } from "class-validator"

export class CreateRegionDto {
    @IsString()
    name_uz: string

    @IsString()
    name_ru: string

    @IsString()
    name_en: string
}
