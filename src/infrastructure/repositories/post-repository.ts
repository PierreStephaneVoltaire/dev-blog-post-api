import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../../domain/entities/post.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class PostRepository {

  constructor(
    @InjectRepository(PostEntity)
    private _postsRepository: Repository<PostEntity>
  ) {
  }

  findAll(): Promise<PostEntity[]> {
    return this._postsRepository.find();
  }

  findOne(id: string): Promise<PostEntity> {
    return this._postsRepository.findOne(id);
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this._postsRepository.delete(id);
  }

  async put(newPost: PostEntity): Promise<UpdateResult> {
    return await this._postsRepository.update(newPost.PostID, newPost);
  }

  async addOne(newPost: PostEntity): Promise<PostEntity> {
    const instance = this._postsRepository.create(newPost);
    return this._postsRepository.save(instance);
  }


}
