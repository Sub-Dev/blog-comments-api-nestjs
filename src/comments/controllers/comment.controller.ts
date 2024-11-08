import { Controller, Post, Body, Param,UseGuards } from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('comments')
@UseGuards(JwtAuthGuard)
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
