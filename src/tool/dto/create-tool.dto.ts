import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateToolDto {
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

    @IsNumber()
    @IsNotEmpty()
    price: number

    @IsNumber()
    @IsNotEmpty()
    quantity: number

    @IsNumber()
    @IsNotEmpty()
    code: number

    @IsString()
    @IsOptional()
    image: string

    @IsBoolean()
    isAvailable: boolean

    @IsString()
    @IsOptional()
    brandId: string

    @IsString()
    @IsOptional()
    capasityId: string

    @IsString()
    @IsOptional()
    sizeId: string
}
