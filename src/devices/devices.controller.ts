import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './devices.entity';
import { MongoRepository } from 'typeorm';

@Controller('devices')
export class DevicesController {
  constructor(
    @InjectRepository(Device)
    private readonly devicesRepository: MongoRepository<Device>,
  ) {}

  @Get()
  async getHello(): Promise<Device> {
    return this.devicesRepository.findOne({});
  }
}
