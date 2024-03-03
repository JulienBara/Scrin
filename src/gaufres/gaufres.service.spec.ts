import { Test, TestingModule } from '@nestjs/testing';
import { GaufresService } from './gaufres.service';

describe('GaufresService', () => {
  let service: GaufresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GaufresService],
    }).compile();

    service = module.get<GaufresService>(GaufresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
