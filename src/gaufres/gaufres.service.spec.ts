import { Test, TestingModule } from '@nestjs/testing';
import { GaufresService } from './gaufres.service';

describe('GaufresService', () => {
  let service: GaufresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GaufresService,
        {
          // https://github.com/nestjs/azure-database/issues/830
          provide: `GaufreAzureCosmosDbModel`,
          useValue: jest.mocked({}),
        },
      ],
    }).compile();

    service = module.get<GaufresService>(GaufresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
