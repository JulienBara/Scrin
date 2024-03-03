import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './devices.entity';
import { MongoRepository } from 'typeorm';

@Controller('devices')
export class DevicesController {
  constructor(
    @InjectRepository(Device)
    private readonly devicesRepository: MongoRepository<Device>,
  ) {}

  @Post('heartbeat')
  async createDevice(@Body() device: Partial<Device>): Promise<void> {
    if (!device || !device.address || !device.name) {
      throw new BadRequestException(`A device must have an address and a name`);
    }
    const deviceFromDb = await this.devicesRepository.findOne({
      where: { address: device.address },
    });

    if (deviceFromDb === null) {
      await this.devicesRepository.save(
        new Device({
          ...device,
          lastHeartbeat: new Date(),
        }),
      );
    } else {
      deviceFromDb.lastHeartbeat = new Date();
      await this.devicesRepository.save(deviceFromDb);
    }

    return;
  }
}
