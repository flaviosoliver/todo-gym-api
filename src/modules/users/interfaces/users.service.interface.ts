import { CreateUserDto, UserDto } from '../dtos/dtos';

export const USERS_SERVICE = 'USERS_SERVICE';

export interface IUsersService {
  create: (user: CreateUserDto) => Promise<UserDto>;
  getAll: () => Promise<UserDto[]>;
  getByEmail: (email: string) => Promise<UserDto>;
  update: (id: string, user: UserDto) => Promise<void>;
  delete: (id: string) => Promise<void>;
  enable: (id: string) => Promise<string>;
  disable: (id: string) => Promise<string>;
}
