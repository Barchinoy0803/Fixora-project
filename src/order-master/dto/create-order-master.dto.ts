import { IsArray, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateOrderMasterDto {
    @IsUUID()
    @IsNotEmpty()
    orderId: string;
  
    @IsArray()
    @IsString({ each: true })
    masterIds: string[];
}
