import { Test, TestingModule } from '@nestjs/testing';
import { GaufresController } from './gaufres.controller';

describe('GaufresController', () => {
  let controller: GaufresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GaufresController],
    }).compile();

    controller = module.get<GaufresController>(GaufresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
