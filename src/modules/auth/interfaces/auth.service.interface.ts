import { UserDto } from 'src/modules/users/dtos/dtos';
import { AuthDto } from '../dtos/auth.dto';

export const AUTH_SERVICE = 'AUTH_SERVICE';

export interface IAuthService {
  login: (email: string, password: string) => Promise<AuthDto>;
  generateToken: (user: UserDto) => string;
  verifyToken: (token: string) => any;
}
