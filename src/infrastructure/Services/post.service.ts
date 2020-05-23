import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import { PostEntity } from '../../domain/entities/post.entity';
import { PostRepository } from '../repositories/post-repository';
import {InsertResult, ObjectLiteral, QueryFailedError} from "typeorm";
import {EntityColumnNotFound} from "typeorm/error/EntityColumnNotFound";

@Injectable()
export class PostService {
  constructor(
    private readonly  postsRepository: PostRepository
  ) {
  }

  findAll(): Promise<PostEntity[]|InternalServerErrorException> {
    return this.postsRepository.findAll().then(posts=>posts).catch(err=>new InternalServerErrorException(err.toString()));
  }

  findOne(id: string): Promise<PostEntity|NotFoundException> {
    return this.postsRepository.findOne(id).then(found=>found).catch(e=>new NotFoundException(`there is no post with id ${id}`))
  }

 remove(id: string): Promise<InternalServerErrorException|NotFoundException|number>  {
    return  this.postsRepository.remove(id).then(r=>r.affected).catch((e:EntityColumnNotFound)=>{
      console.log(e)
      return new NotFoundException("Post Not Found")
    }).catch(err=>{console.log(err)
      return new InternalServerErrorException(err.toString())});

  }

  put(newPost: PostEntity): Promise<InternalServerErrorException|NotFoundException|number> {
    return this.postsRepository.put(newPost).then(r=>r.affected).catch((e:EntityColumnNotFound)=>{
      console.log(e)
      return new NotFoundException("Post Not Found")
    }).catch(err=>{console.log(err)
      return new InternalServerErrorException(err.toString())});
  }

  addOne(newPost: PostEntity): Promise<PostEntity | InternalServerErrorException> {
    return this.postsRepository.addOne(newPost).then(e=>e).catch(err=>new InternalServerErrorException(err));;
  }
}
