import { Injectable } from '@nestjs/common';
import { PostEntity } from '../../domain/entities/post.entity';
import { PostRepository } from '../repositories/post-repository';

@Injectable()
export class PostService {
  constructor(
    private readonly  postsRepository: PostRepository
  ) {
  }

  findAll(): Promise<PostEntity[]> {
    return this.postsRepository.findAll();
  }

  findOne(id: string): Promise<PostEntity> {
    return this.postsRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.postsRepository.remove(id);
  }

  put(newPost: PostEntity): Promise<boolean> {
    return this.postsRepository.put(newPost).then((r) => {
      return r?.affected > 0;
    });
  }

  addOne(newPost: PostEntity): Promise<PostEntity> {
    return this.postsRepository.addOne(newPost);
  }
}
