import { IsNotEmpty, IsString } from "class-validator"

export class CreateProfessionToolDto {
    @IsString()
    @IsNotEmpty()
    professionId: string

    @IsString()
    @IsNotEmpty()
    toolId: string
}
