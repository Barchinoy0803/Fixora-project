import { IsNotEmpty, IsString } from "class-validator"

export class CreateFaqDto {
    @IsString()
    @IsNotEmpty()
    question_uz: string

    @IsString()
    @IsNotEmpty()
    question_ru: string

    @IsString()
    @IsNotEmpty()
    question_en: string

    @IsString()
    @IsNotEmpty()
    answer_uz: string

    @IsString()
    @IsNotEmpty()
    answer_ru: string

    @IsString()
    @IsNotEmpty()
    answer_en: string
}
