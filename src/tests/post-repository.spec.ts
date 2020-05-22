import { Test, TestingModule } from '@nestjs/testing';
import { PostRepository } from '../infrastructure/repositories/post-repository';

describe('PostRepository', () => {
  let provider: PostRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostRepository]
    }).compile();

    provider = module.get<PostRepository>(PostRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
