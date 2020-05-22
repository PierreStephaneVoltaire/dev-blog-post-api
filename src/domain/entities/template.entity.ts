import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from './post.entity';
import { ModuleRef } from '@nestjs/core';

@Entity('templates')
export class TemplateEntity {
  @PrimaryGeneratedColumn()
  ID: number;
  @Column()
  Title: string;
  @Column()
  Order: string;
  CreatedDate: Date;
  @Column()
  UpdateDate: Date;
  @Column()
  Location: string;
  @ManyToOne(type => PostEntity, post => post.PostTemplates)
  post: PostEntity;

  constructor(private readonly moduleRef: ModuleRef) {
  }
}
