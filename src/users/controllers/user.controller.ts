import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { AuthService } from '../../auth/auth.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginDto } from '../dtos/login.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar um novo usuário' })
  @ApiBody({ description: 'Dados do usuário', type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso' })
  async register(@Body() createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const user = await this.userService.create(username, password);
    return user;
  }

  @Post('login')
  @ApiOperation({ summary: 'Login de um usuário existente' })
  @ApiBody({ description: 'Credenciais de login', type: LoginDto })
  @ApiResponse({ status: 201, description: 'Token de acesso JWT' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async login(@Body() loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.userService.findOne(username);

    if (!user || !(await user.validatePassword(password))) {
      throw new Error('Credenciais inválidas');
    }

    const token = await this.authService.login(user);
    return { access_token: token };
  }
}
