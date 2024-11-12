import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../services/user.service';
import { AuthService } from '../../auth/auth.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginDto } from '../dtos/login.dto';

describe('UserController', () => {
  let userController: UserController;
  let userService: Partial<UserService>;
  let authService: Partial<AuthService>;

  beforeEach(async () => {
    userService = {
      create: jest.fn().mockResolvedValue({ id: 1, username: 'testuser', password: 'hashedPassword' }),
      findOne: jest.fn().mockResolvedValue({
        id: 1,
        username: 'testuser',
        password: 'hashedPassword',
        validatePassword: jest.fn().mockResolvedValue(true), // Mock do método validatePassword
      }),
    };

    authService = {
      login: jest.fn().mockResolvedValue('token123'),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: AuthService, useValue: authService },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
  });

  it('deve registrar um usuário', async () => {
    const dto: CreateUserDto = { username: 'testuser', password: '12345' };
    const result = await userController.register(dto);
    expect(result).toHaveProperty('id');
    expect(userService.create).toHaveBeenCalledWith('testuser', '12345');
  });

  it('deve logar um usuário', async () => {
    const dto: LoginDto = { username: 'testuser', password: '12345' };
    const result = await userController.login(dto);
    expect(result).toHaveProperty('access_token');
    expect(authService.login).toHaveBeenCalled();
  });
});
