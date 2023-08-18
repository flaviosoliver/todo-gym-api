import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import {
  IUsersRepository,
  USERS_REPOSITORY,
} from './interfaces/users.repository.interface';
import { CreateUserDto, ShapeHistoryDto, UserDto } from './dtos/dtos';
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
        const userDto = mapUser(user);
        return userDto;
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

  async hashedPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async create(user: CreateUserDto): Promise<UserDto> {
    try {
      validate(user).then((errors) => {
        if (errors.length > 0) {
          throw new BadRequestException(errors);
        }
      });
      const existis = await this.getByEmail(user.email);
      if (!existis) {
        user.password = await this.hashedPassword(user.password);
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

  transformString(arr: any): string {
    const mergedProps: Record<string, string[]> = {};

    arr.forEach((obj) => {
      for (const prop in obj) {
        if (mergedProps[prop]) {
          mergedProps[prop].push(obj[prop]);
        } else {
          mergedProps[prop] = [obj[prop]];
        }
      }
    });

    const result = Object.entries(mergedProps).map(
      ([prop, messages]) => `${prop}: ${messages.join(', ')}`
    );

    return result.join('\n');
  }

  async updateShape(id: string, shape: ShapeHistoryDto): Promise<void> {
    const shapeHistoryDto = new ShapeHistoryDto();
    shapeHistoryDto.age = new Date(shape.age);
    shapeHistoryDto.height = shape.height;
    shapeHistoryDto.weight = shape.weight;
    shapeHistoryDto.bmi = shape.bmi;

    const validObj = validate(shapeHistoryDto)
      .then((errors) => {
        if (errors.length > 0) {
          const arr = errors.map((error) => error.constraints);
          const str = this.transformString(arr);
          this.logger.error(str);
          return false;
        } else {
          return true;
        }
      })
      .catch((error) => {
        this.logger.error(error);
        throw new BadRequestException(error);
      });

    if ((await validObj) === true) {
      const user = this.getById(id);
      if (user !== undefined) {
        await this.repository.updateShape(id, shape);
      }
    } else {
      throw new BadRequestException();
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
