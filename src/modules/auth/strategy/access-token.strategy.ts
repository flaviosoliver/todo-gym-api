import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import {
  IUsersService,
  USERS_SERVICE,
} from 'src/modules/users/interfaces/users.service.interface';
import { UserDto } from 'src/modules/users/dtos/user.dto';

export const ACCESS_TOKEN_STRATEGY = 'ACCESS_TOKEN_STRATEGY';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(USERS_SERVICE)
    private readonly usersService: IUsersService
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }
  async validate(payload: JwtPayload): Promise<UserDto> {
    const { email } = payload;
    const user = await this.usersService.getByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
