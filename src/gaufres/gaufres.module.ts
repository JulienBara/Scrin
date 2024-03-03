import { Module } from '@nestjs/common';
import { GaufresController } from './gaufres.controller';
import { GaufresService } from './gaufres.service';

@Module({
  controllers: [GaufresController],
  providers: [GaufresService],
})
export class GaufresModule {}
