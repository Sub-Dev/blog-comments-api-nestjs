// create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'johndoe', description: 'Nome de usuário do novo usuário' })
  username: string;

  @ApiProperty({ example: 'password123', description: 'Senha para o novo usuário' })
  password: string;
}
