import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';
import { CreateUserDto, UserDto } from './dtos/dtos';
import { IUsersRepository } from './interfaces/users.repository.interface';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectModel(User.name)
    readonly model: Model<UserDocument>
  ) {}

  async create(user: CreateUserDto): Promise<UserDto> {
    return await this.model.create(user);
  }

  async getAll(): Promise<UserDto[]> {
    return await this.model.find();
  }

  async getById(id: string): Promise<UserDto> {
    return await this.model.findById(id);
  }

  async getByEmail(email: string): Promise<UserDto> {
    const result = await this.model.findOne({ email: email });
    return result ? result : null;
  }

  async update(id: string, user: UserDto): Promise<void> {
    await this.model.updateOne({ _id: id }, user);
  }

  async delete(id: string): Promise<void> {
    await this.model.deleteOne({ _id: id });
  }

  async enable(id: string): Promise<void> {
    await this.model.updateOne({ _id: id }, { active: true });
  }

  async disable(id: string): Promise<void> {
    await this.model.updateOne({ _id: id }, { active: false });
  }
}
