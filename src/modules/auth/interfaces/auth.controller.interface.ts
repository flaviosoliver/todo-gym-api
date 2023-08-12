import { Request } from 'express';
import { AuthDto, LoginDto } from '../dtos/dtos';

export const AUTH_CONTROLLER = 'AUTH_CONTROLLER';

export interface IAuthController {
  login: (doc: LoginDto) => Promise<AuthDto>;
  logout(request: Request): Promise<void>;
}
