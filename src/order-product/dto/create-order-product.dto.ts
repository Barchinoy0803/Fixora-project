import { TIME_UNIT } from "@prisma/client"
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateOrderProductDto {
    @IsString()
    @IsNotEmpty()
    orderId: string

    @IsString()
    @IsNotEmpty()
    professionId: string

    @IsString()
    @IsOptional()
    toolId: string

    @IsString()
    @IsNotEmpty()
    levelId: string

    @IsEnum(TIME_UNIT)
    timeUnit: TIME_UNIT


    @IsNumber()
    @IsNotEmpty()
    workingTime: number

    @IsNumber()
    @IsNotEmpty()
    price: number

    @IsNumber()
    @IsNotEmpty()
    count: number
}
