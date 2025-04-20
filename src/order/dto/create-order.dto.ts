import {
    ArrayNotEmpty,
    IsArray,
    IsBoolean,
    IsDate,
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
  import { ApiProperty } from '@nestjs/swagger';
  
  export class OrderItemDto {
    @ApiProperty({ example: 'uuid', description: 'Profession ID', required: false })
    @IsOptional()
    @IsUUID()
    professionId?: string;
  
    @ApiProperty({ example: 'uuid', description: 'Level ID', required: false })
    @IsOptional()
    @IsUUID()
    levelId?: string;
  
    @ApiProperty({ example: 2, description: 'Item count' })
    @IsInt()
    @Min(0)
    count: number;
  
    @ApiProperty({ enum: TIME_UNIT, description: 'Time unit' })
    @IsEnum(TIME_UNIT)
    timeUnit: TIME_UNIT;
  
    @ApiProperty({ example: 5, description: 'Working time in selected unit' })
    @IsNumber()
    @IsNotEmpty()
    workingTime: number;
  
    @ApiProperty({ example: 15000, description: 'Price per unit' })
    @IsNumber()
    @IsPositive()
    price: number;
  
    @ApiProperty({ example: 'uuid', description: 'Tool ID', required: false })
    @IsOptional()
    @IsUUID()
    toolId?: string;
  }
  
  export class CreateOrderDto {
    @ApiProperty({ example: 'Main street, Apt 12', description: 'Delivery address' })
    @IsString()
    @IsNotEmpty()
    address: string;
  
    @ApiProperty({ example: '41.311081', description: 'Longitude' })
    @IsString()
    @IsNotEmpty()
    longitude: string;
  
    @ApiProperty({ example: '69.240562', description: 'Latitude' })
    @IsString()
    @IsNotEmpty()
    latitude: string;
  
    @ApiProperty({ example: new Date().toISOString(), description: 'Order date' })
    @IsDate()
    @Type(() => Date)
    date: Date;
  
    @ApiProperty({ example: 50000, description: 'Total price of the order' })
    @IsNumber()
    @IsPositive()
    totalPrice: number;
  
    @ApiProperty({ enum: PAYMENT_TYPE, description: 'Payment method' })
    @IsEnum(PAYMENT_TYPE)
    paymentType: PAYMENT_TYPE;
  
    @ApiProperty({ example: true, description: 'Is delivery required' })
    @IsBoolean()
    withDelivery: boolean;
  
    @ApiProperty({ example: 'Leave at the door', description: 'Comment for delivery' })
    @IsString()
    deliveryComment: string;
  
    @ApiProperty({ type: [OrderItemDto], description: 'List of order items' })
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    orderItems: OrderItemDto[];
  }
  