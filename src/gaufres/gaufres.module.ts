import { Module } from '@nestjs/common';
import { GaufresController } from './gaufres.controller';
import { GaufresService } from './gaufres.service';
import { AzureCosmosDbModule } from '@nestjs/azure-database';
import { Gaufre } from './gaufres.entity';

@Module({
  imports: [AzureCosmosDbModule.forFeature([{ dto: Gaufre }])],
  controllers: [GaufresController],
  providers: [GaufresService],
  exports: [GaufresService],
})
export class GaufresModule {}
