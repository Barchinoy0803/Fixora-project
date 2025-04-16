import { ORDER_STATUS, PAYMENT_TYPE } from "@prisma/client"
import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    userId: string

    @IsString()
    @IsNotEmpty()
    address: string

    @IsString()
    @IsNotEmpty()
    longitude: string

    @IsString()
    @IsNotEmpty()
    latitude: string

    @IsDate()
    date: Date

    @IsNumber()
    @IsOptional()
    totalPrice: number

    @IsEnum(PAYMENT_TYPE)
    paymentType: PAYMENT_TYPE

    @IsBoolean()
    @IsNotEmpty()
    withDelivery: boolean

    @IsEnum(ORDER_STATUS)
    status: ORDER_STATUS

    @IsString()
    @IsOptional()
    deliveryComment: string
}
