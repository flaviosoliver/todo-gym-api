import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth, AuthDocument } from './auth.model';
import { IAuthRepository } from './interfaces/auth.repository.interface';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @InjectModel(Auth.name)
    readonly model: Model<AuthDocument>
  ) {}

  async create(auth: Auth): Promise<Auth> {
    return await this.model.create(auth);
  }
}
