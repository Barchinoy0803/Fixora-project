import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ORDER_STATUS, PAYMENT_TYPE, TIME_UNIT } from '@prisma/client';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty({ example: 'Main street, Apt 12', required: false })
  address?: string;

  @ApiProperty({ example: '41.311081', required: false })
  longitude?: string;

  @ApiProperty({ example: '69.240562', required: false })
  latitude?: string;

  @ApiProperty({ example: new Date().toISOString(), required: false })
  date?: Date;

  @ApiProperty({ example: 50000, required: false })
  totalPrice?: number;

  @ApiProperty({ enum: PAYMENT_TYPE, required: false })
  paymentType?: PAYMENT_TYPE;

  @ApiProperty({ example: true, required: false })
  withDelivery?: boolean;

  @ApiProperty({ enum: ORDER_STATUS, required: false })
  status?: ORDER_STATUS;

  @ApiProperty({ example: 'Leave at the door', required: false })
  deliveryComment?: string;
}
