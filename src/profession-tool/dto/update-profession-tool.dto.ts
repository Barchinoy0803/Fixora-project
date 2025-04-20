import { PartialType } from '@nestjs/mapped-types';
import { CreateProfessionToolDto } from './create-profession-tool.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfessionToolDto extends PartialType(CreateProfessionToolDto) {
  @ApiPropertyOptional({
    example: 'b2ad614d-934a-4b52-bd73-11905f36a1b3',
    description: 'UUID of the profession (optional)',
  })
  professionId?: string;

  @ApiPropertyOptional({
    example: '39c8924d-8033-4b7a-85f4-d6a5e48eac1a',
    description: 'UUID of the tool (optional)',
  })
  toolId?: string;
}
