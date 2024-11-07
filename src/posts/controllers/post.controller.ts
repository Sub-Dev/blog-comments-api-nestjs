import { Controller, Get, Post, Body } from '@nestjs/common';
import { PostService } from '../services/post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(@Body() body: { title: string; content: string }) {
    return await this.postService.createPost(body.title, body.content);
  }

  @Get()
  async findAll() {
    return await this.postService.getAllPosts();
  }
}
