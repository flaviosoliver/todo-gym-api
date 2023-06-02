import { Auth } from '../auth.model';

export const AUTH_REPOSITORY = 'AUTH_REPOSITORY';

export interface IAuthRepository {
  create: (auth: Auth) => Promise<Auth>;
}
