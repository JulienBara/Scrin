import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevicesController } from './devices/devices.controller';
import { ConfigModule } from '@nestjs/config';
import { Device } from './devices/devices.entity';
import { AzureCosmosDbModule } from '@nestjs/azure-database';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AzureCosmosDbModule.forRoot({
      dbName: process.env.AZURE_COSMOS_DB_NAME,
      endpoint: process.env.AZURE_COSMOS_DB_ENDPOINT,
      key: process.env.AZURE_COSMOS_DB_KEY,
      retryAttempts: 1,
    }),
    AzureCosmosDbModule.forFeature([
      {
        dto: Device,
      },
    ]),
  ],
  controllers: [AppController, DevicesController],
  providers: [AppService],
})
export class AppModule {}
