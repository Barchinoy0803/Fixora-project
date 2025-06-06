import { Module } from '@nestjs/common';
import { ProfessionService } from './profession.service';
import { ProfessionController } from './profession.controller';

@Module({
  controllers: [ProfessionController],
  providers: [ProfessionService],
})
export class ProfessionModule {}
