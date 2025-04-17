import {
    ArrayNotEmpty,
    IsArray,
    IsBoolean,
    IsDate,
    IsDateString,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    IsUUID,
    Min,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ORDER_STATUS, PAYMENT_TYPE, TIME_UNIT } from '@prisma/client';

export class OrderItemDto {
    @IsOptional()
    @IsUUID()
    professionId?: string;

    @IsOptional()
    @IsUUID()
    levelId?: string;

    @IsInt()
    @Min(0)
    count: number;

    @IsEnum(TIME_UNIT)
    timeUnit: TIME_UNIT;

    @IsNumber()
    @IsNotEmpty()
    workingTime: number;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsOptional()
    @IsUUID()
    toolId?: string;

}

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    longitude: string;

    @IsString()
    @IsNotEmpty()
    latitude: string;

    @IsDate()
    @Type(() => Date)
    date: Date;

    @IsNumber()
    @IsPositive()
    totalPrice: number;

    @IsEnum(PAYMENT_TYPE)
    paymentType: PAYMENT_TYPE;

    @IsBoolean()
    withDelivery: boolean;

    @IsEnum(ORDER_STATUS)
    status: ORDER_STATUS;

    @IsString()
    deliveryComment: string;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    orderItems: OrderItemDto[];
}
