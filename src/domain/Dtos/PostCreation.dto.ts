import { ApiProperty } from '@nestjs/swagger';
import { PostEntity } from '../entities/post.entity';
import { Mapper } from '../../libs/mapper';

export class CreatePostDto {
  @ApiProperty()
  readonly PostTitle: string;
  @ApiProperty()
  readonly PostSubTitle: string;
  @ApiProperty()
  readonly PostThumbNailImage: string;
  @ApiProperty()
  readonly PostContent?: string;
  @ApiProperty()
  readonly author: string;
  @ApiProperty()
  readonly Meta: any;

  static convertToEntity(post: CreatePostDto): PostEntity {
    return Mapper.ConvertTo(PostEntity, post);
  }




}
