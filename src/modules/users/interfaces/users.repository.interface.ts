import { CreateUserDto, ShapeHistoryDto, UserDto } from '../dtos/dtos';

export const USERS_REPOSITORY = 'USERS_REPOSITORY';

export interface IUsersRepository {
  create: (user: CreateUserDto) => Promise<UserDto>;
  getAll: () => Promise<UserDto[]>;
  getById: (id: string) => Promise<UserDto>;
  getByEmail: (email: string) => Promise<UserDto>;
  update: (id: string, user: UserDto) => Promise<void>;
  updateShape: (id: string, shape: ShapeHistoryDto) => Promise<void>;
  delete: (id: string) => Promise<void>;
  enable: (id: string) => Promise<void>;
  disable: (id: string) => Promise<void>;
}
