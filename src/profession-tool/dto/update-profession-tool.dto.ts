import { PartialType } from '@nestjs/mapped-types';
import { CreateProfessionToolDto } from './create-profession-tool.dto';

export class UpdateProfessionToolDto extends PartialType(CreateProfessionToolDto) {}
