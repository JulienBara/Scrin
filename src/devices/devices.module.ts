import { Module } from '@nestjs/common';
import { AzureCosmosDbModule } from '@nestjs/azure-database';
import { Device } from './devices.entity';
import { DevicesController } from './devices.controller';
import { GaufresModule } from 'src/gaufres/gaufres.module';

@Module({
  imports: [AzureCosmosDbModule.forFeature([{ dto: Device }]), GaufresModule],
  controllers: [DevicesController],
})
export class DevicesModule {}
