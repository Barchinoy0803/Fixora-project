import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateMasterProfessionDto {
    @IsString()
    @IsNotEmpty()
    professionId: string

    @IsNumber()
    @IsNotEmpty()
    minWorkingHours: number

    @IsString()
    @IsNotEmpty()
    levelId: string

    @IsNumber()
    @IsNotEmpty()
    priceHourly: number

    @IsNumber()
    @IsNotEmpty()
    priceDaily: number

    @IsNumber()
    @IsNotEmpty()
    experience: number

    @IsString()
    @IsNotEmpty()
    masterId: string
}
