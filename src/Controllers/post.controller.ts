import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostService } from '../infrastructure/Services/post.service';
import { CreatePostDto } from '../domain/Dtos/PostCreation.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {
  }

  @Get()
  async getAllPosts() {
    return this.postService.findAll();
  }

  @Get(':id')
  async getPostById(@Param('id')id: string) {
    return this.postService.findOne(id);
  }

  @Post()
  async createPosts(@Body() post: CreatePostDto) {
    return this.postService.addOne(CreatePostDto.convertToEntity(post));
  }

  @Put(':id')
  async updatePost(@Param('id')id: string, @Body() post: CreatePostDto) {
    return this.postService.findAll();
  }

  @Delete(':id')
  async DeletePost(@Param('id')id: string) {
    return this.postService.remove(id);
  }
}
