import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Post } from './posts/entities/post.entity';
import { Comment } from './comments/entities/comment.entity';
import { PostService } from './posts/services//post.service';
import { CommentService } from './comments/services/comment.service';
import { PostController } from './posts/controllers/post.controller';
import { CommentController } from './comments/controllers/comment.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),  
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USER', 'nestuser'),
        password: configService.get<string>('DB_PASSWORD', 'nestpassword'),
        database: configService.get<string>('DB_NAME', 'blog_comments'),
        autoLoadEntities: true,
        synchronize: true, 
      }),
    }),
    TypeOrmModule.forFeature([Post, Comment]), 
  ],
  controllers: [PostController, CommentController],
  providers: [PostService, CommentService],
})
export class AppModule {}
