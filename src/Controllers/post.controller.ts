import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Res
} from '@nestjs/common';
import {PostService} from '../infrastructure/Services/post.service';
import {CreatePostDto} from '../domain/Dtos/PostCreation.dto';
import {Mapper} from "../libs/mapper";
import {PostEntity} from "../domain/entities/post.entity";
import {Response} from "express";
import {UpdatePostDto} from "../domain/Dtos/PostUpdate.dto";

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {
  }

  @Get()
  async getAllPosts() {
    return this.postService.findAll()
  }


  @Get(':id')
  async getPostById(@Param('id')
                      id: string
  ) {
    return this.postService.findOne(id);
  }

  @Post()
  async createPosts(@Body()
                      post: CreatePostDto
  ) {
    return this.postService.addOne(CreatePostDto.convertToEntity(post)).then(t=>t).catch(e=>{ console.log("hh",typeof e) ;return e});
  }

  @Put(':id')
  async updatePost(@Param('id')
                     id: number, @Body()
                     post: UpdatePostDto,
                   @Res() res: Response
  ) {
    let mpost = UpdatePostDto.convertToEntity( post)
    mpost.PostID = Number(id)
    const putAction = this.postService.put(mpost
    )
    putAction.then((r) => {
      if (!Number.isNaN(Number(r))&&r>0) {
        res.statusCode = HttpStatus.OK

        res.send("Post updated");
      } else {
        switch (r instanceof InternalServerErrorException) {
          case true:
            res.statusCode = HttpStatus.INTERNAL_SERVER_ERROR

            res.send("Something went wrong")
            break;
          case false:
            res.statusCode = HttpStatus.NOT_FOUND

            res.send(`object with id ${id} not found`)
            break;
        }
      }
    })
  }

  @Delete(':id')
  async DeletePost(@Param('id')
                     id: string,
                   @Res() res: Response

  ) {
    const deleteAction = this.postService.remove(id).then((r) => {
      if (!Number.isNaN(Number(r))&&r>0) {
        console.log(r)
        res.statusCode = HttpStatus.OK

        res.send("Post deleted");
      } else {
        switch (r instanceof InternalServerErrorException) {
          case true:
            res.statusCode = HttpStatus.INTERNAL_SERVER_ERROR

            res.send("Something went wrong")
            break;
          case false:
            res.statusCode = HttpStatus.NOT_FOUND

            res.send(`object with id ${id} not found`)
            break;
        }
      }
    })
  }
}
