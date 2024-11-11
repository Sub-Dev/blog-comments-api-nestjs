import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthService } from '../auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Realizar login de um usuário' })
  @ApiBody({ description: 'Dados de login', type: Object })
  @ApiResponse({ status: 201, description: 'Login realizado com sucesso' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async login(@Request() req) {
    return this.authService.login(req.body);
  }
}
