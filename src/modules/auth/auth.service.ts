import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  IUsersService,
  USERS_SERVICE,
} from '../users/interfaces/users.service.interface';
import { comparePasswords } from './utils/credentials.utils';
import { UserDto } from '../users/dtos/user.dto';
import {
  AUTH_REPOSITORY,
  IAuthRepository,
} from './interfaces/auth.repository.interface';
import { AuthDto } from './dtos/dtos';
import { IAuthService } from './interfaces/auth.service.interface';

@Injectable()
export class AuthService implements IAuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly repository: IAuthRepository,
    @Inject(USERS_SERVICE)
    private readonly usersService: IUsersService,
    private jwtService: JwtService
  ) {}

  generateToken(user: UserDto): string {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string): any {
    return this.jwtService.verify(token);
  }

  async login(email: string, password: string): Promise<string> {
    try {
      const user = await this.usersService.getByEmail(email);

      if (!user) {
        throw new UnauthorizedException(`User email ${email}`);
      }

      const isPasswordValid = await comparePasswords(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException(
          `Password is incorrect to user ${user.email}`
        );
      }

      const token = this.generateToken(user);

      const doc: AuthDto = {
        email: user.email,
        token: token,
      };

      await this.repository.create(doc);

      return token;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException();
    }
  }
}
