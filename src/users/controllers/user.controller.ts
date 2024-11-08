// user.controller.ts
import { Controller, Post, Body, Req } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthService } from '../../auth/auth.service'; // Para autenticação
import { CreateUserDto } from '../dtos/create-user.dto'; // DTO para criação de usuário
import { LoginDto } from '../dtos/login.dto'; // DTO para login

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService, // Serviço de autenticação
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const user = await this.userService.create(username, password);
    return user;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.userService.findOne(username);

    if (!user || !(await user.validatePassword(password))) {
      throw new Error('Invalid credentials');
    }

    const token = await this.authService.login(user); 
    return { access_token: token };
  }
}
