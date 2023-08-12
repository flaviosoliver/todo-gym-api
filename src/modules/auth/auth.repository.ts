import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth, AuthDocument } from './auth.model';
import { IAuthRepository } from './interfaces/auth.repository.interface';
import { AuthDto } from './dtos/auth.dto';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @InjectModel(Auth.name)
    readonly model: Model<AuthDocument>
  ) {}

  async create(auth: Auth): Promise<Auth> {
    return await this.model.create(auth);
  }

  async getByAccessToken(token: string): Promise<Auth> {
    return await this.model.findOne({ accessToken: token });
  }

  async saveNewAccessToken(refreshToken: string, auth: AuthDto): Promise<void> {
    await this.model.updateOne(
      { 'refreshToken.refreshToken': refreshToken },
      auth
    );
  }

  async getByRefreshToken(token: string): Promise<Auth> {
    const result = await this.model.findOne({
      'refreshToken.refreshToken': token,
    });

    return result;
  }
}
