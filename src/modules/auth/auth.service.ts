import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  IUsersService,
  USERS_SERVICE,
} from '../users/interfaces/users.service.interface';
import {
  AUTH_REPOSITORY,
  IAuthRepository,
} from './interfaces/auth.repository.interface';
import { AuthDto } from './dtos/dtos';
import { IAuthService } from './interfaces/auth.service.interface';
import { comparePasswords } from './utils/credentials.utils';
import { User } from '../users/user.model';

@Injectable()
export class AuthService implements IAuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly repository: IAuthRepository,
    @Inject(USERS_SERVICE)
    private readonly usersService: IUsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  private readonly secretAccess = this.configService.get<string>('JWT_SECRET');
  private readonly secretRefresh =
    this.configService.get<string>('JWT_REFRESH_SECRET');

  async login(email: string, password: string): Promise<AuthDto> {
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

      const accessToken = this.generateAccessToken(user.id, user.email);
      const refreshToken = await this.generateRefreshToken(user.id, user.email);

      const doc: AuthDto = {
        userId: user.id,
        email: user.email,
        accessToken: accessToken,
        refreshToken: {
          refreshToken: refreshToken,
          expiresIn: this.unixTimestamp(),
        },
      };

      await this.repository.create(doc);

      return doc;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException();
    }
  }

  async logout(userId: string) {
    try {
      const user = await this.usersService.getById(userId);

      if (!user) {
        throw new UnauthorizedException(`User id ${userId}`);
      }

      const doc: AuthDto = {
        userId: '',
        email: '',
        accessToken: '',
        refreshToken: {
          refreshToken: '',
          expiresIn: 0,
        },
      };

      return doc;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException();
    }
  }

  async refreshTokens(data: AuthDto): Promise<AuthDto> {
    try {
      const doc = await this.repository.getByRefreshToken(
        data.refreshToken.refreshToken
      );

      if (!doc) {
        throw new NotFoundException(
          `Token ${data.refreshToken.refreshToken} not found`
        );
      }

      const newAccessToken = await this.generateAccessToken(
        data.userId,
        data.email
      );

      const newRefreshToken = await this.generateRefreshToken(
        data.userId,
        data.email
      );

      const decodedRefreshToken = await this.decodeToken(newAccessToken);

      const authDocument = new AuthDto();
      authDocument.userId = data.userId;
      authDocument.email = data.email;
      authDocument.accessToken = newAccessToken;
      authDocument.refreshToken = {
        refreshToken: newRefreshToken,
        expiresIn: decodedRefreshToken.exp,
      };

      await this.repository.saveNewAccessToken(
        data.refreshToken.refreshToken,
        authDocument
      );
      return authDocument;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException();
    }
  }

  async decodeToken(token: string): Promise<any> {
    try {
      return this.jwtService.decode(token);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async validateUser(email: string, password: string) {
    let user: User;
    try {
      user = await this.usersService.getByEmail(email);

      if (!user) return null;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException();
    }
    const isPasswordValid = comparePasswords(password, user.password);

    if (!isPasswordValid) return null;

    return user;
  }

  private generateAccessToken(userId: string, email: string): string {
    const payload = { sub: userId, email: email };
    return this.jwtService.sign(payload);
  }

  private async generateRefreshToken(
    userId: string,
    email: string
  ): Promise<string> {
    const refreshToken = await this.jwtService.signAsync(
      {
        sub: userId,
        email: email,
      },
      {
        secret: this.secretRefresh,
        expiresIn: '30d',
      }
    );
    return refreshToken;
  }

  unixTimestamp() {
    const currentDate = new Date();
    const futureDate = new Date(
      currentDate.getTime() + 30 * 24 * 60 * 60 * 1000
    );
    const unix = Math.floor(futureDate.getTime() / 1000);

    return unix;
  }
}
