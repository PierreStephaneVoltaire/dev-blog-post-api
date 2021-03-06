import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TemplateEntity } from './template.entity';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn()  PostID: number;
  @Column({ nullable: false })  PostTitle: string;
  @Column({ nullable: false })  PostSubTitle: string;
  @Column({ default: null ,nullable: true})  PostThumbNailImage?: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })  CreatedDate: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })  UpdateDate: Date;
  @Column({ default: true })  DRAFT: boolean;
  @Column({ default: null })  PostContent?: string;
  @OneToMany(type => TemplateEntity, templates => templates.post, { nullable: true })  PostTemplates: TemplateEntity[];
  @Column({ nullable: false })  author: string;
  @Column({ nullable:false,type:  'json'})  Meta: any;

  constructor() {
  }



}
