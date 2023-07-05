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
  IPlansService,
  PLANS_SERVICE,
} from './interfaces/plans.service.interface';
import { Plan } from './plan.model';
import { CreatePlanDto, PlanDto, UpdatePlanDto } from './dtos/dtos';
import {
  UNAUTHORIZED_401,
  BAD_REQUEST_400,
  NOT_FOUND_404,
  SERVER_ERROR_500,
  OK_200,
  CREATED_201,
} from '../shared/utils/http-response-status.utils';
import { ParamsDto } from '../shared/dtos/params.dto';
import { TrainingUpdateDto } from '../shared/dtos/update-training.dto';
import { TrainingDto } from '../shared/dtos/training.dto';

@Controller('plans')
@ApiTags('plans')
export class PlansController {
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
  async getAll(): Promise<Plan[]> {
    return await this.service.getAll();
  }

  @Get('search')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED_401 })
  @ApiBadRequestResponse({ description: BAD_REQUEST_400 })
  @ApiNotFoundResponse({ description: NOT_FOUND_404 })
  @ApiInternalServerErrorResponse({ description: SERVER_ERROR_500 })
  @ApiOkResponse({ description: OK_200, type: [PlanDto] })
  async findByParams(@Query() params?: ParamsDto): Promise<PlanDto[]> {
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
  async create(@Body() plan: CreatePlanDto): Promise<Plan> {
    return await this.service.create(plan);
  }

  @Patch(':id/update')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED_401 })
  @ApiBadRequestResponse({ description: BAD_REQUEST_400 })
  @ApiNotFoundResponse({ description: NOT_FOUND_404 })
  @ApiOkResponse({ description: OK_200 })
  async update(@Param('id') id: string, @Body() plan: PlanDto): Promise<void> {
    return await this.service.update(id, plan);
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
    @Body() trainingData: TrainingDto[]
  ): Promise<PlanDto> {
    return await this.service.addOrUpdateTraining(id, trainingData);
  }
}
