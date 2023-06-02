import { LoginDto } from '../dtos/dtos';

export const AUTH_CONTROLLER = 'AUTH_CONTROLLER';

export interface IAuthController {
  login: (doc: LoginDto) => Promise<string>;
}
