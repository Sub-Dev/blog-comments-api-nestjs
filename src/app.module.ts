// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Post } from './posts/entities/post.entity';
import { Comment } from './comments/entities/comment.entity';
import { User } from './users/entities/user.entity'; // Importação da entidade User
import { PostService } from './posts/services/post.service';
import { CommentService } from './comments/services/comment.service';
import { UserService } from './users/services/user.service'; // Importação do serviço UserService
import { PostController } from './posts/controllers/post.controller';
import { CommentController } from './comments/controllers/comment.controller';
import { UserController } from './users/controllers/user.controller'; // Importação do controlador UserController
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';

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
    TypeOrmModule.forFeature([Post, Comment, User]), // Registro das entidades
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'yourSecretKey', // Configuração do JWT
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [PostController, CommentController, UserController],
  providers: [PostService, CommentService, UserService, AuthService],
})
export class AppModule {}
