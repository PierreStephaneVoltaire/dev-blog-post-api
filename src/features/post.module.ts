import { Module } from '@nestjs/common';
import { PostEntity } from '../domain/entities/post.entity';
import { PostController } from '../Controllers/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from '../infrastructure/Services/post.service';
import { Connection } from 'typeorm';
import { PostRepository } from '../infrastructure/repositories/post-repository';

@Module({
  imports: [


    TypeOrmModule.forFeature([PostEntity])],
  providers: [PostService, PostRepository],

  exports: [TypeOrmModule],

  controllers: [PostController]
})
export class PostModule {
  constructor(connection: Connection) {
  }
}
