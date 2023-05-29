import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  IUsersRepository,
  USERS_REPOSITORY,
} from './interfaces/users.repository.interface';
import { CreateUserDto, UserDto } from './dtos/dtos';
import { isEmail, validate } from 'class-validator';
import { IUsersService } from './interfaces/users.service.interface';
import { mapUser } from './utils/user.mapper';

@Injectable()
export class UsersService implements IUsersService {
  private readonly logger = new Logger('UsersService');

  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly repository: IUsersRepository
  ) {}

  async getAll(): Promise<UserDto[]> {
    try {
      return await this.repository.getAll();
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getById(id: string): Promise<UserDto> {
    try {
      const user = await this.repository.getById(id);
      if (user != null || user != undefined) {
        return mapUser(user);
      } else {
        throw new NotFoundException(`Id ${id} not found`);
      }
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(`Invalid id ${id}`);
    }
  }

  async getByEmail(email: string): Promise<UserDto> {
    try {
      const valid = isEmail(email);
      if (valid) {
        const user = await this.repository.getByEmail(email);
        if (user != null || user != undefined) {
          return mapUser(user);
        }
      } else {
        throw new NotFoundException(`Email ${email} not found`);
      }
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(`Invalid email ${email}`);
    }
  }

  async create(user: CreateUserDto): Promise<UserDto> {
    try {
      const errors = await validate(user);
      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }
      const existis = await this.getByEmail(user.email);
      if (!existis) {
        return await this.repository.create(user);
      } else {
        throw new BadRequestException(
          `User with email ${user.email} already exists`
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(error);
        throw new BadRequestException(error.message);
      }
    }
  }

  async update(id: string, user: UserDto): Promise<void> {
    try {
      const result = await this.repository.getById(id);
      if (result !== undefined) {
        return await this.repository.update(id, user);
      } else {
        throw new NotFoundException(`User id ${id} not found`);
      }
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(`Update user id ${id} failed`);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const result = await this.repository.getById(id);
      if (result !== undefined) {
        return await this.repository.delete(id);
      }
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(`Delete user id ${id} failed`);
    }
  }

  async enable(id: string): Promise<string> {
    try {
      const user = await this.getById(id);
      if (user !== undefined) {
        await this.repository.enable(id);
        return `${id} enabled`;
      }
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(`Enable user id ${id} failed`);
    }
  }

  async disable(id: string): Promise<string> {
    try {
      const user = await this.getById(id);
      if (user !== undefined) {
        await this.repository.disable(id);
        return `${id} disabled`;
      }
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(`Disable user id ${id} failed`);
    }
  }
}
