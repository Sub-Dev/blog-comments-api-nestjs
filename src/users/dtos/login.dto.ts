// login.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'johndoe', description: 'Nome de usuário para login' })
  username: string;

  @ApiProperty({ example: 'password123', description: 'Senha para login' })
  password: string;
}
