import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateProfessionLevelDto {
    @IsString()
    @IsNotEmpty()
    professionId: string

    @IsString()
    @IsNotEmpty()
    levelId: string

    @IsNumber()
    @IsNotEmpty()
    minWorkingHours: number

    @IsNumber()
    @IsNotEmpty()
    priceHourly: number

    @IsNumber()
    @IsNotEmpty()
    priceDaily: number
}
