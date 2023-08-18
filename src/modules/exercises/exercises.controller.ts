import {
  Controller,
  Inject,
  Get,
  UseGuards,
  Param,
  NotFoundException,
  Body,
  Post,
  Patch,
  Query,
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
  EXERCISES_SERVICE,
  IExercisesService,
} from './interfaces/exercises.service.interface';
import { IExercisesController } from './interfaces/exercises.controller.interface';
import {
  BAD_REQUEST_400,
  CREATED_201,
  NOT_FOUND_404,
  OK_200,
  SERVER_ERROR_500,
  UNAUTHORIZED_401,
} from '../shared/utils/http-response-status.utils';
import { Exercise } from './exercise.model';
import { ExerciseDto, CreateExerciseDto } from './dtos/dtos';
import { ParamsDto } from '../shared/dtos/params.dto';
import { AccessTokenGuard } from '../auth/guard/access-token.guard';

@Controller('exercises')
@UseGuards(AccessTokenGuard)
@ApiTags('exercises')
export class ExercisesController implements IExercisesController {
  constructor(
    @Inject(EXERCISES_SERVICE)
    private readonly service: IExercisesService
  ) {}

  @Get()
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED_401 })
  @ApiBadRequestResponse({ description: BAD_REQUEST_400 })
  @ApiNotFoundResponse({ description: NOT_FOUND_404 })
  @ApiInternalServerErrorResponse({ description: SERVER_ERROR_500 })
  @ApiOkResponse({ description: OK_200, type: [Exercise] })
  async getAll(): Promise<Exercise[]> {
    return await this.service.getAll();
  }

  @Get('search')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED_401 })
  @ApiBadRequestResponse({ description: BAD_REQUEST_400 })
  @ApiNotFoundResponse({ description: NOT_FOUND_404 })
  @ApiInternalServerErrorResponse({ description: SERVER_ERROR_500 })
  @ApiOkResponse({ description: OK_200, type: [ExerciseDto] })
  async findByParams(@Query() params?: ParamsDto): Promise<ExerciseDto[]> {
    const exercise = await this.service.findByParams(params);
    if (!exercise || exercise.length === 0) {
      return;
    }
    return exercise;
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED_401 })
  @ApiBadRequestResponse({ description: BAD_REQUEST_400 })
  @ApiNotFoundResponse({ description: NOT_FOUND_404 })
  @ApiInternalServerErrorResponse({ description: SERVER_ERROR_500 })
  @ApiOkResponse({ description: OK_200, type: [ExerciseDto] })
  async getById(@Param('id') id: string): Promise<ExerciseDto> {
    const exercise = await this.service.getById(id);
    if (!exercise) {
      throw new NotFoundException(`Id ${id} not found`);
    }
    return exercise;
  }

  @Post()
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED_401 })
  @ApiBadRequestResponse({ description: BAD_REQUEST_400 })
  @ApiNotFoundResponse({ description: NOT_FOUND_404 })
  @ApiInternalServerErrorResponse({ description: SERVER_ERROR_500 })
  @ApiOkResponse({ description: CREATED_201, type: [ExerciseDto] })
  @ApiBody({ type: CreateExerciseDto })
  async create(@Body() exercise: CreateExerciseDto): Promise<Exercise> {
    return await this.service.create(exercise);
  }

  @Patch(':id/update')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED_401 })
  @ApiBadRequestResponse({ description: BAD_REQUEST_400 })
  @ApiNotFoundResponse({ description: NOT_FOUND_404 })
  @ApiOkResponse({ description: OK_200 })
  async update(
    @Param('id') id: string,
    @Body() exercise: ExerciseDto
  ): Promise<void> {
    return await this.service.update(id, exercise);
  }
}
