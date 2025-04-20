import { TIME_UNIT } from "@prisma/client";
import { IsEnum, IsNumber, isNumber, IsUUID } from "class-validator";

export class CreateBasketDto {
    @IsUUID()
    professionId: string

    @IsUUID()
    toolId: string

    @IsNumber()
    count: number
 
    @IsEnum(TIME_UNIT)
    timeUnit: TIME_UNIT

    @IsNumber()
    workingTime: number

    @IsUUID()
    levelId: string
}
