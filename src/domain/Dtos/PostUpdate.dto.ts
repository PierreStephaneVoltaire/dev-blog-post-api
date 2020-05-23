
import {ApiProperty} from "@nestjs/swagger";
import {PostEntity} from "../entities/post.entity";
import {Mapper} from "../../libs/mapper";

export class UpdatePostDto{
  @ApiProperty()

  PostTitle: string;
  @ApiProperty()

  PostSubTitle: string;
  @ApiProperty()

  PostThumbNailImage: string;
  @ApiProperty()

  CreatedDate: Date;
  @ApiProperty()

  UpdateDate: Date;
  DRAFT: boolean;
  @ApiProperty()

  PostContent?: string;
  @ApiProperty()

  PostTemplates: any[];
  @ApiProperty()

  author: string;
  @ApiProperty()

  Meta: any;
  static convertToEntity(post: UpdatePostDto): PostEntity {
    return Mapper.ConvertTo(PostEntity, post);
  }
}
