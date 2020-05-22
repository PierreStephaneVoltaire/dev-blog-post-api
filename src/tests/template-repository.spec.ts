import { Test, TestingModule } from '@nestjs/testing';
import { TemplateRepository } from '../infrastructure/repositories/template-repository';

describe('TemplateRepository', () => {
  let provider: TemplateRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateRepository]
    }).compile();

    provider = module.get<TemplateRepository>(TemplateRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
