import { Test, TestingModule } from '@nestjs/testing';
import { DevicesController } from './devices.controller';
import { GaufresService } from '../gaufres/gaufres.service';

describe('DevicesController', () => {
  let controller: DevicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevicesController],
      providers: [
        {
          // https://github.com/nestjs/azure-database/issues/830
          provide: `DeviceAzureCosmosDbModel`,
          useValue: jest.mocked({}),
        },
        {
          provide: GaufresService,
          useValue: jest.mocked({}),
        },
      ],
    }).compile();

    controller = module.get<DevicesController>(DevicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
