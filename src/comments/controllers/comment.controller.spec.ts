import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from './comment.controller';
import { CommentService } from '../services/comment.service';
import { Comment } from '../entities/comment.entity';
import { Post } from '../../posts/entities/post.entity';

describe('CommentController', () => {
  let commentController: CommentController;
  let commentService: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [
        {
          provide: CommentService,
          useValue: {
            addComment: jest.fn(),
          },
        },
      ],
    }).compile();

    commentController = module.get<CommentController>(CommentController);
    commentService = module.get<CommentService>(CommentService);
  });

  it('deve adicionar um novo comentário a uma postagem', async () => {
    const postId = 1;
    const commentDto = { text: 'Este é um comentário' };
    const mockPost: Post = { 
      id: postId, 
      title: 'Post simples', 
      content: 'este e um post simples', 
      comments: [] 
    };
    const mockComment: Comment = { 
      id: 1, 
      text: commentDto.text, 
      post: mockPost 
    };

    jest.spyOn(commentService, 'addComment').mockResolvedValue(mockComment);

    const result = await commentController.addComment(postId, commentDto);
    expect(result).toEqual(mockComment);
    expect(commentService.addComment).toHaveBeenCalledWith(postId, commentDto.text);
  });
});
