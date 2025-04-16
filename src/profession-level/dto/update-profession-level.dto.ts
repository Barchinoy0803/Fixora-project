import { PartialType } from '@nestjs/mapped-types';
import { CreateProfessionLevelDto } from './create-profession-level.dto';

export class UpdateProfessionLevelDto extends PartialType(CreateProfessionLevelDto) {}
