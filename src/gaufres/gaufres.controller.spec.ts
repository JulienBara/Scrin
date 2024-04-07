import { Test, TestingModule } from '@nestjs/testing';
import { GaufresController } from './gaufres.controller';
import { GaufresService } from './gaufres.service';

describe('GaufresController', () => {
  let controller: GaufresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GaufresController],
      providers: [
        {
          provide: GaufresService,
          useValue: jest.mocked({}),
        },
      ],
    }).compile();

    controller = module.get<GaufresController>(GaufresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
