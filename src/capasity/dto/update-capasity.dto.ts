import { PartialType } from '@nestjs/mapped-types';
import { CreateCapasityDto } from './create-capasity.dto';

export class UpdateCapasityDto extends PartialType(CreateCapasityDto) {}
