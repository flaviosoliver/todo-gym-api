import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {
  IUsersService,
  USERS_SERVICE,
} from './interfaces/users.service.interface';
import { IUsersController } from './interfaces/users.controller.interface';
import {
  BAD_REQUEST_400,
  CREATED_201,
  NOT_FOUND_404,
  OK_200,
  SERVER_ERROR_500,
  UNAUTHORIZED_401,
} from '../shared/utils/http-response-status.utils';
import { User } from './user.model';
import { ShapeHistoryDto, UserDto, CreateUserDto } from './dtos/dtos';

@Controller('users')
@ApiTags('users')
export class UsersController implements IUsersController {
  constructor(
    @Inject(USERS_SERVICE)
    private readonly service: IUsersService
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED_401 })
  @ApiBadRequestResponse({ description: BAD_REQUEST_400 })
  @ApiNotFoundResponse({ description: NOT_FOUND_404 })
  @ApiInternalServerErrorResponse({ description: SERVER_ERROR_500 })
  @ApiOkResponse({ description: OK_200, type: [User] })
  async getAll(): Promise<User[]> {
    return await this.service.getAll();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED_401 })
  @ApiBadRequestResponse({ description: BAD_REQUEST_400 })
  @ApiNotFoundResponse({ description: NOT_FOUND_404 })
  @ApiInternalServerErrorResponse({ description: SERVER_ERROR_500 })
  @ApiOkResponse({ description: CREATED_201, type: [UserDto] })
  @ApiBody({ type: CreateUserDto })
  async create(@Body() user: CreateUserDto): Promise<User> {
    return await this.service.create(user);
  }

  @Get('email')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED_401 })
  @ApiBadRequestResponse({ description: BAD_REQUEST_400 })
  @ApiNotFoundResponse({ description: NOT_FOUND_404 })
  @ApiInternalServerErrorResponse({ description: SERVER_ERROR_500 })
  @ApiOkResponse({ description: OK_200, type: [UserDto] })
  async getByEmail(@Query('email') email: string): Promise<UserDto> {
    const user = await this.service.getByEmail(email);
    if (!user) {
      throw new NotFoundException(`Email ${email} not found`);
    }
    return user;
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED_401 })
  @ApiBadRequestResponse({ description: BAD_REQUEST_400 })
  @ApiNotFoundResponse({ description: NOT_FOUND_404 })
  @ApiInternalServerErrorResponse({ description: SERVER_ERROR_500 })
  @ApiOkResponse({ description: OK_200, type: [UserDto] })
  async getById(@Param('id') id: string): Promise<UserDto> {
    const user = await this.service.getById(id);
    if (!user) {
      throw new NotFoundException(`Id ${id} not found`);
    }
    return user;
  }

  @Patch(':id/update')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED_401 })
  @ApiBadRequestResponse({ description: BAD_REQUEST_400 })
  @ApiNotFoundResponse({ description: NOT_FOUND_404 })
  @ApiOkResponse({ description: OK_200 })
  async update(@Param('id') id: string, @Body() user: UserDto): Promise<void> {
    return await this.service.update(id, user);
  }

  @Patch(':id/shape-update')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED_401 })
  @ApiBadRequestResponse({ description: BAD_REQUEST_400 })
  @ApiNotFoundResponse({ description: NOT_FOUND_404 })
  @ApiOkResponse({ description: OK_200 })
  async updateShape(
    @Param('id') id: string,
    @Body() shape: ShapeHistoryDto
  ): Promise<void> {
    return await this.service.updateShape(id, shape);
  }

  @Patch(':id/enable')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED_401 })
  @ApiBadRequestResponse({ description: BAD_REQUEST_400 })
  @ApiNotFoundResponse({ description: NOT_FOUND_404 })
  @ApiOkResponse({ description: OK_200, type: String })
  async enable(@Param('id') id: string): Promise<string> {
    return await this.service.enable(id);
  }

  @Patch(':id/disable')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED_401 })
  @ApiBadRequestResponse({ description: BAD_REQUEST_400 })
  @ApiNotFoundResponse({ description: NOT_FOUND_404 })
  @ApiOkResponse({ description: OK_200, type: String })
  async disable(@Param('id') id: string): Promise<string> {
    return await this.service.disable(id);
  }
}
