import { Auth } from '../auth.model';
import { AuthDto } from '../dtos/auth.dto';

export const AUTH_REPOSITORY = 'AUTH_REPOSITORY';

export interface IAuthRepository {
  create: (auth: Auth) => Promise<Auth>;
  getByAccessToken: (token: string) => Promise<Auth>;
  getByRefreshToken: (token: string) => Promise<Auth>;
  saveNewAccessToken: (refreshToken: string, auth: AuthDto) => Promise<void>;
}
