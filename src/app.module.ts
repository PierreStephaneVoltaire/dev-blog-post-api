import { Module } from '@nestjs/common';

import { PostController } from './Controllers/post.controller';
import { PostService } from './infrastructure/Services/post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './domain/entities/post.entity';
import { PostModule } from './features/post.module';
import { PostRepository } from './infrastructure/repositories/post-repository';
import { TemplateRepository } from './infrastructure/repositories/template-repository';
import { TemplateEntity } from './domain/entities/template.entity';
import * as path from 'path';

require('dotenv').config({ path: path.join(__dirname, '.env') });

@Module({
  imports: [

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.db_host,
      port: 3306,
      username: process.env.db_username,
      password: process.env.db_password,
      database: process.env.db_database,
      entities: [PostEntity, TemplateEntity],
      synchronize: true,
      logging: true,
      keepConnectionAlive: true
    }),

    PostModule


  ],
  controllers: [PostController],
  providers: [PostService, PostRepository, TemplateRepository]
})
export class AppModule {
  constructor() {
    console.log(process.env.db_database);
  }


}
