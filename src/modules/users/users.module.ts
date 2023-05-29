import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './user.model';
import { USERS_SERVICE } from './interfaces/users.service.interface';
import { USERS_REPOSITORY } from './interfaces/users.repository.interface';
import { UsersRepository } from './users.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    { useClass: UsersService, provide: USERS_SERVICE },
    { useClass: UsersRepository, provide: USERS_REPOSITORY },
  ],
  exports: [USERS_SERVICE, USERS_REPOSITORY],
})
export class UsersModule {}
