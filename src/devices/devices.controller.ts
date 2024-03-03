import { Body, Controller, Post } from '@nestjs/common';
import type { Container } from '@azure/cosmos';
import { Device } from './devices.entity';
import { DeviceDTO } from './devices.dto';
import { InjectModel } from '@nestjs/azure-database';

@Controller('devices')
export class DevicesController {
  constructor(
    @InjectModel(Device)
    private readonly devicesContainer: Container,
  ) {}

  @Post('heartbeat')
  async createDevice(@Body() deviceDto: DeviceDTO): Promise<void> {
    await this.devicesContainer.items.upsert<Device>({
      id: deviceDto.address,
      name: deviceDto.name,
      lastHeartbeat: new Date(),
    });

    return;
  }
}
