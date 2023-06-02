import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
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
import { LoginDto } from './dtos/dtos';

@Controller('auth')
@ApiTags('auth')
export class AuthController implements IAuthController {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly service: IAuthService
  ) {}

  @Post()
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED_401 })
  @ApiBadRequestResponse({ description: BAD_REQUEST_400 })
  @ApiNotFoundResponse({ description: NOT_FOUND_404 })
  @ApiInternalServerErrorResponse({ description: SERVER_ERROR_500 })
  @ApiOkResponse({ description: OK_200, type: UserDto })
  async login(@Body() doc: LoginDto): Promise<string> {
    const { email, password } = doc;
    return await this.service.login(email, password);
  }
}
