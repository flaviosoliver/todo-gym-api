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

@Controller('auth')
@ApiTags('auth')
export class AuthController implements IAuthController {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly service: IAuthService
  ) {}

  @Post()
  @UseGuards(AuthGuard('local'))
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED_401 })
  @ApiBadRequestResponse({ description: BAD_REQUEST_400 })
  @ApiNotFoundResponse({ description: NOT_FOUND_404 })
  @ApiInternalServerErrorResponse({ description: SERVER_ERROR_500 })
  @ApiOkResponse({ description: OK_200, type: UserDto })
  async login(@Body() doc: LoginDto): Promise<AuthDto> {
    const { email, password } = doc;
    return await this.service.login(email, password);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED_401 })
  @ApiBadRequestResponse({ description: BAD_REQUEST_400 })
  @ApiNotFoundResponse({ description: NOT_FOUND_404 })
  @ApiOkResponse({ description: OK_200 })
  async logout(@Req() request: Request): Promise<void> {
    const userId = request.user?.id;
    return this.service.logout(userId);
  }

  @Post('refreshtoken')
  @UseGuards(AuthGuard('jwt-refresh'))
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED_401 })
  @ApiBadRequestResponse({ description: BAD_REQUEST_400 })
  @ApiNotFoundResponse({ description: NOT_FOUND_404 })
  @ApiOkResponse({ description: OK_200 })
  async refreshToken(@Req() request: Request): Promise<AuthDto> {
    const data = request.user;
    return await this.service.refreshTokens(data);
  }
}
