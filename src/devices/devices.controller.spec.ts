import { Test, TestingModule } from '@nestjs/testing';
import { DevicesController } from './devices.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Device } from './devices.entity';
import { Repository } from 'typeorm';

describe('DevicesController', () => {
  let controller: DevicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevicesController],
      providers: [
        { provide: getRepositoryToken(Device), useClass: Repository },
      ],
    }).compile();

    controller = module.get<DevicesController>(DevicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
