import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CommentService } from '../services/comment.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@ApiTags('comments')
@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':postId')
  @ApiOperation({ summary: 'Adicionar um comentário a um post' })
  @ApiParam({ name: 'postId', description: 'ID do post' })
  @ApiBody({ description: 'Dados do comentário', type: Object })
  @ApiResponse({ status: 201, description: 'Comentário adicionado com sucesso' })
  async addComment(
    @Param('postId') postId: number,
    @Body() body: { text: string },
  ) {
    return await this.commentService.addComment(postId, body.text);
  }
}
