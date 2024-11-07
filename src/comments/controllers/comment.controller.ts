import { Controller, Post, Body, Param } from '@nestjs/common';
import { CommentService } from '../services/comment.service';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':postId')
  async addComment(
    @Param('postId') postId: number,
    @Body() body: { text: string },
  ) {
    return await this.commentService.addComment(postId, body.text);
  }
}
