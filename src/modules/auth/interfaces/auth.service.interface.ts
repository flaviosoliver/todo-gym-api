import { UserDto } from 'src/modules/users/dtos/dtos';
import { AuthDto } from '../dtos/auth.dto';
import { JwtPayload } from './jwt-payload.interface';

export const AUTH_SERVICE = 'AUTH_SERVICE';

export interface IAuthService {
  login: (email: string, password: string) => Promise<AuthDto>;
  logout: (userId: string) => void;
  refreshTokens: (data: any) => Promise<AuthDto>;
  validateToken: (
    accessToken: string,
    refreshToken: string,
    payload: JwtPayload
  ) => void;
  validateUser: (email: string, password: string) => void;
}
