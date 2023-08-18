import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import {
  AUTH_SERVICE,
  IAuthService,
} from './interfaces/auth.service.interface';
import { IAuthController } from './interfaces/auth.controller.interface';
import {
  UNAUTHORIZED_401,
  BAD_REQUEST_400,
  NOT_FOUND_404,
  SERVER_ERROR_500,
  OK_200,
} from '../shared/utils/http-response-status.utils';
import { UserDto } from '../users/dtos/dtos';
import { AuthDto, LoginDto } from './dtos/dtos';
import { Public } from './decorator/public.decorator';
import { AccessTokenGuard } from './guard/access-token.guard';
import { RefreshTokenGuard } from './guard/refresh-token.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController implements IAuthController {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly service: IAuthService
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED_401 })
  @ApiBadRequestResponse({ description: BAD_REQUEST_400 })
  @ApiNotFoundResponse({ description: NOT_FOUND_404 })
  @ApiInternalServerErrorResponse({ description: SERVER_ERROR_500 })
  @ApiOkResponse({ description: OK_200, type: UserDto })
  async login(@Body() doc: LoginDto): Promise<AuthDto> {
    const { email, password } = doc;
    return await this.service.login(email, password);
  }

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED_401 })
  @ApiBadRequestResponse({ description: BAD_REQUEST_400 })
  @ApiNotFoundResponse({ description: NOT_FOUND_404 })
  @ApiOkResponse({ description: OK_200 })
  async logout(@Req() request: Request): Promise<void> {
    const userId = request.user?.id;
    return this.service.logout(userId);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refreshtoken')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED_401 })
  @ApiBadRequestResponse({ description: BAD_REQUEST_400 })
  @ApiNotFoundResponse({ description: NOT_FOUND_404 })
  @ApiOkResponse({ description: OK_200 })
  async refreshToken(@Body() data: AuthDto): Promise<AuthDto> {
    return await this.service.refreshTokens(data);
  }
}
