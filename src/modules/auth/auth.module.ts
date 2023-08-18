import { Module } from '@nestjs/common';
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
import {
  ACCESS_TOKEN_STRATEGY,
  AccessTokenStrategy,
} from './strategy/access-token.strategy';
import {
  REFRESH_TOKEN_STRATEGY,
  RefreshTokenStrategy,
} from './strategy/refresh-token.strategy';
import { LOCAL_STRATEGY, LocalStrategy } from './strategy/local.strategy';

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
    ConfigModule,
  ],
  providers: [
    { useClass: AuthService, provide: AUTH_SERVICE },
    { useClass: AuthRepository, provide: AUTH_REPOSITORY },
    { useClass: UsersService, provide: USERS_SERVICE },
    { useClass: LocalStrategy, provide: LOCAL_STRATEGY },
    { useClass: AccessTokenStrategy, provide: ACCESS_TOKEN_STRATEGY },
    {
      useClass: RefreshTokenStrategy,
      provide: REFRESH_TOKEN_STRATEGY,
    },
  ],
  controllers: [AuthController],
  exports: [AUTH_SERVICE, AUTH_REPOSITORY],
})
export class AuthModule {
  constructor() {
    dotenv.config();
  }
}
