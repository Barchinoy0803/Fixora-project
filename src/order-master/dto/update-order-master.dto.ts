import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderMasterDto } from './create-order-master.dto';

export class UpdateOrderMasterDto extends PartialType(CreateOrderMasterDto) {}
