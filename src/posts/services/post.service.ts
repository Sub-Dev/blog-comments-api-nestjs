import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async createPost(title: string, content: string): Promise<Post> {
    const post = new Post();
    post.title = title;
    post.content = content;

    return await this.postRepository.save(post);
  }

  async getAllPosts(): Promise<Post[]> {
    return await this.postRepository.find();
  }
}
