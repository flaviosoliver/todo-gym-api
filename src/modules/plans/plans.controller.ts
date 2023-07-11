import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
  Patch,
  Req,
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
import { Request } from 'express';
import {
  IPlansService,
  PLANS_SERVICE,
} from './interfaces/plans.service.interface';
import { Plan } from './plan.model';
import { CreatePlanDto, PlanDto } from './dtos/dtos';
import {
  UNAUTHORIZED_401,
  BAD_REQUEST_400,
  NOT_FOUND_404,
  SERVER_ERROR_500,
  OK_200,
  CREATED_201,
} from '../shared/utils/http-response-status.utils';
import { ParamsDto } from '../shared/dtos/params.dto';
import { TrainingDto } from '../shared/dtos/training.dto';
import { IPlansController } from './interfaces/plans.controller.interface';

@Controller('plans')
@ApiTags('plans')
export class PlansController implements IPlansController {
  constructor(
    @Inject(PLANS_SERVICE)
    private readonly service: IPlansService
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED_401 })
  @ApiBadRequestResponse({ description: BAD_REQUEST_400 })
  @ApiNotFoundResponse({ description: NOT_FOUND_404 })
  @ApiInternalServerErrorResponse({ description: SERVER_ERROR_500 })
  @ApiOkResponse({ description: OK_200, type: [Plan] })
  async getAll(@Req() request: Request): Promise<Plan[]> {
    const userId = request.user?.id;
    return await this.service.getAll(userId);
  }

  @Get('search')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED_401 })
  @ApiBadRequestResponse({ description: BAD_REQUEST_400 })
  @ApiNotFoundResponse({ description: NOT_FOUND_404 })
  @ApiInternalServerErrorResponse({ description: SERVER_ERROR_500 })
  @ApiOkResponse({ description: OK_200, type: [PlanDto] })
  async findByParams(
    @Req() request: Request,
    @Query() params?: ParamsDto
  ): Promise<PlanDto[]> {
    const userId = request.user?.id;
    params.userId = userId;
    const plan = await this.service.findByParams(params);
    if (!plan || plan.length === 0) {
      return;
    }
    return plan;
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED_401 })
  @ApiBadRequestResponse({ description: BAD_REQUEST_400 })
  @ApiNotFoundResponse({ description: NOT_FOUND_404 })
  @ApiInternalServerErrorResponse({ description: SERVER_ERROR_500 })
  @ApiOkResponse({ description: OK_200, type: [PlanDto] })
  async getById(@Param('id') id: string): Promise<PlanDto> {
    const plan = await this.service.getById(id);
    if (!plan) {
      throw new NotFoundException(`Id ${id} not found`);
    }
    return plan;
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED_401 })
  @ApiBadRequestResponse({ description: BAD_REQUEST_400 })
  @ApiNotFoundResponse({ description: NOT_FOUND_404 })
  @ApiInternalServerErrorResponse({ description: SERVER_ERROR_500 })
  @ApiOkResponse({ description: CREATED_201, type: [PlanDto] })
  @ApiBody({ type: CreatePlanDto })
  async create(
    @Body() plan: CreatePlanDto,
    @Req() request: Request
  ): Promise<Plan> {
    const userId = request.user?.id;
    plan.userId = userId;
    return await this.service.create(plan);
  }

  @Patch(':id/update')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED_401 })
  @ApiBadRequestResponse({ description: BAD_REQUEST_400 })
  @ApiNotFoundResponse({ description: NOT_FOUND_404 })
  @ApiOkResponse({ description: OK_200 })
  async update(
    @Param('id') id: string,
    @Body() plan: PlanDto,
    @Req() request: Request
  ): Promise<void> {
    const userId = request.user?.id;
    return await this.service.update(id, plan, userId);
  }

  @Patch(':id/updatetraining')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED_401 })
  @ApiBadRequestResponse({ description: BAD_REQUEST_400 })
  @ApiNotFoundResponse({ description: NOT_FOUND_404 })
  @ApiOkResponse({ description: OK_200 })
  async addOrUpdateTraining(
    @Param('id') id: string,
    @Req() request: Request,
    @Body() trainingData: TrainingDto[]
  ): Promise<PlanDto> {
    const userId = request.user?.id;
    return await this.service.addOrUpdateTraining(id, userId, trainingData);
  }

  @Patch(':id/doneexercise')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED_401 })
  @ApiBadRequestResponse({ description: BAD_REQUEST_400 })
  @ApiNotFoundResponse({ description: NOT_FOUND_404 })
  @ApiOkResponse({ description: OK_200 })
  async updateExerciseDoneStatus(
    @Param('id') id: string,
    @Req() request: Request,
    @Body('exerciseId') exerciseId: string
  ): Promise<void> {
    const userId = request.user?.id;
    return await this.service.updateExerciseDoneStatus(id, userId, exerciseId);
  }
}
