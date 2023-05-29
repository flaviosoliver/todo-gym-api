import { CreateUserDto, UserDto } from '../dtos/dtos';
import { User } from '../user.model';

export const USERS_CONTROLLER = 'USERS_CONTROLLER';

export interface IUsersController {
  create: (user: CreateUserDto) => Promise<User>;
  getAll: () => Promise<User[]>;
  getByEmail: (email: string) => Promise<UserDto>;
  update: (id: string, user: UserDto) => Promise<void>;
  enable: (id: string) => Promise<string>;
  disable: (id: string) => Promise<string>;
}
