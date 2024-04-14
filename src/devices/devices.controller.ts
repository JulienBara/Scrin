import { Body, Controller, Post } from '@nestjs/common';
import type { Container } from '@azure/cosmos';
import { Device } from './devices.entity';
import { DeviceDTO } from './devices.dto';
import { InjectModel } from '@nestjs/azure-database';
import { GaufresService } from '../gaufres/gaufres.service';
import { Public } from 'src/auth';

@Controller('devices')
export class DevicesController {
  constructor(
    @InjectModel(Device)
    private readonly devicesContainer: Container,
    private readonly gaufresService: GaufresService,
  ) {}

  @Post('heartbeat')
  @Public()
  async heartbeatDevice(@Body() deviceDto: DeviceDTO): Promise<void> {
    await this.devicesContainer.items.upsert<Device>({
      id: deviceDto.address,
      name: deviceDto.name,
      lastHeartbeat: new Date(),
    });

    await this.gaufresService.heartbeatGaufre(deviceDto.address);

    return;
  }
}
