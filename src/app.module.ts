import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),  // Mudado de 'db' para 'localhost'
        port: +configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USER', 'nestuser'),
        password: configService.get<string>('DB_PASSWORD', 'nestpassword'),
        database: configService.get<string>('DB_NAME', 'blog_comments'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
})
export class AppModule {}
