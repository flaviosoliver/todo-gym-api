import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AUTH_SERVICE } from './interfaces/auth.service.interface';
import { AuthRepository } from './auth.repository';
import { AUTH_REPOSITORY } from './interfaces/auth.repository.interface';
import { Auth, AuthSchema } from './auth.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { USERS_SERVICE } from '../users/interfaces/users.service.interface';
import { UsersService } from '../users/users.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { TokenRefreshMiddleware } from './middleware/token-refresh.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Auth.name,
        schema: AuthSchema,
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    { useClass: AuthService, provide: AUTH_SERVICE },
    { useClass: AuthRepository, provide: AUTH_REPOSITORY },
    { useClass: UsersService, provide: USERS_SERVICE },
    JwtStrategy,
  ],
})
export class AuthModule implements NestModule {
  constructor() {
    dotenv.config();
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenRefreshMiddleware).forRoutes('*');
  }
}
