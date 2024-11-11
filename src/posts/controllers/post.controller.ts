import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { PostService } from '../services/post.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@ApiTags('posts')
@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo post' })
  @ApiBody({ description: 'Dados do post', type: Object })
  @ApiResponse({ status: 201, description: 'Post criado com sucesso' })
  async create(@Body() body: { title: string; content: string }) {
    return await this.postService.createPost(body.title, body.content);
  }

  @Get()
  @ApiOperation({ summary: 'Obter todos os posts' })
  @ApiResponse({ status: 200, description: 'Lista de todos os posts' })
  async findAll() {
    return await this.postService.getAllPosts();
  }
}
