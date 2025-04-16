import { PartialType } from '@nestjs/mapped-types';
import { CreateMasterProfessionDto } from './create-master-profession.dto';

export class UpdateMasterProfessionDto extends PartialType(CreateMasterProfessionDto) {}
