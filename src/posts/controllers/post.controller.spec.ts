import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from '../services/post.service';
import { Post } from '../entities/post.entity'; // Import da entidade Post

describe('PostController', () => {
  let postController: PostController;
  let postService: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: PostService,
          useValue: {
            createPost: jest.fn(),
            getAllPosts: jest.fn(),
          },
        },
      ],
    }).compile();

    postController = module.get<PostController>(PostController);
    postService = module.get<PostService>(PostService);
  });

  it('deveria criar uma nova postagem', async () => {
    const createPostDto = { title: 'Novo Post', content: 'esse e um novo post' };
    const mockPost: Post = { 
      id: 1, 
      title: createPostDto.title, 
      content: createPostDto.content, 
      comments: [] // Campo `comments` adicionado para corresponder ao tipo `Post`
    };

    jest.spyOn(postService, 'createPost').mockResolvedValue(mockPost);

    const result = await postController.create(createPostDto);
    expect(result).toEqual(mockPost);
    expect(postService.createPost).toHaveBeenCalledWith(createPostDto.title, createPostDto.content);
  });

  it('deve retornar uma lista de postagens', async () => {
    const mockPosts: Post[] = [
      { id: 1, title: 'Post 1', content: 'Content 1', comments: [] },
      { id: 2, title: 'Post 2', content: 'Content 2', comments: [] },
    ];

    jest.spyOn(postService, 'getAllPosts').mockResolvedValue(mockPosts);

    const result = await postController.findAll();
    expect(result).toEqual(mockPosts);
    expect(postService.getAllPosts).toHaveBeenCalled();
  });
});
