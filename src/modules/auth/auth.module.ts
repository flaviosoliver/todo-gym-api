import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
