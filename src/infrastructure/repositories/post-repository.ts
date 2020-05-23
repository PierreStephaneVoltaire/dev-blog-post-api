import { Injectable } from '@nestjs/common';
import {getEntityManagerToken, InjectRepository} from '@nestjs/typeorm';
import { PostEntity } from '../../domain/entities/post.entity';
import {Connection, DeleteResult, EntityManager, InsertResult, Repository, UpdateResult} from 'typeorm';

@Injectable()
export class PostRepository {

  constructor(
    @InjectRepository(PostEntity)
    private _postsRepository: Repository<PostEntity>,private connection:Connection
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
    try {

      return this._postsRepository.save({
        author:newPost.author,
        PostContent:newPost.PostContent,
         PostSubTitle:newPost.PostSubTitle,
        PostThumbNailImage:newPost.PostThumbNailImage,
        PostTitle:newPost.PostTitle,
        // Meta:newPost.Meta
      })
    }
    catch (e) {
      console.log(typeof e)
    }
  }


}
