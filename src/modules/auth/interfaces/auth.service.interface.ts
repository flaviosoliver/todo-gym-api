import { UserDto } from 'src/modules/users/dtos/dtos';

export const AUTH_SERVICE = 'AUTH_SERVICE';

export interface IAuthService {
  login: (email: string, password: string) => Promise<string>;
  generateToken: (user: UserDto) => string;
  verifyToken: (token: string) => any;
}
