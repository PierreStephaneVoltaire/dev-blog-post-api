import { ApiProperty } from '@nestjs/swagger';
import { PostEntity } from '../entities/post.entity';
import { Mapper } from '../../libs/mapper';

export class CreatePostDto {
  @ApiProperty()
  PostTitle: string;
  @ApiProperty()
  PostSubTitle: string;
  @ApiProperty()
  PostThumbNailImage: string;
  @ApiProperty()
  PostContent?: string;
  @ApiProperty()
  author: string;
  @ApiProperty()
  Meta: any;

  static convertToEntity(post: CreatePostDto): PostEntity {
    return Mapper.ConvertTo(PostEntity, post);
  }
}


