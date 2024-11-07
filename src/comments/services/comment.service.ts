import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async addComment(postId: number, text: string): Promise<Comment> {
    const comment = new Comment();
    comment.text = text;
    comment.post = { id: postId } as any;

    return await this.commentRepository.save(comment);
  }
}
