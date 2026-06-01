import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CurrentUser,
  JwtUser,
} from '../auth/decorators/current-user.decorator.js';
import { ApplicationService } from './application.service.js';
import { ApplicationQueryDto } from './dto/application-query.dto.js';
import {
  ApplicationResponseDto,
  ApplicationsResponseDto,
} from './dto/application-response.dto.js';
import { CreateApplicationDto } from './dto/create-application.dto.js';
import { UpdateApplicationDto } from './dto/update-application.dto.js';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get()
  getApplications(
    @CurrentUser() user: JwtUser | undefined,
    @Query() query: ApplicationQueryDto,
  ): Promise<ApplicationsResponseDto> {
    const userId = user?.id;

    if (!userId) {
      throw new UnauthorizedException('Unauthorized');
    }

    return this.applicationService.getApplications(userId, query);
  }

  @Get(':id')
  getApplication(
    @CurrentUser() user: JwtUser | undefined,
    @Param('id') id: string,
  ): Promise<ApplicationResponseDto> {
    const userId = user?.id;

    if (!userId) {
      throw new UnauthorizedException('Unauthorized');
    }

    return this.applicationService.getApplication(userId, id);
  }

  @Post()
  createApplication(
    @CurrentUser() user: JwtUser | undefined,
    @Body() body: CreateApplicationDto,
  ): Promise<ApplicationResponseDto> {
    const userId = user?.id;

    if (!userId) {
      throw new UnauthorizedException('Unauthorized');
    }

    return this.applicationService.createApplication(userId, body);
  }

  @Patch(':id')
  updateApplication(
    @CurrentUser() user: JwtUser | undefined,
    @Param('id') id: string,
    @Body() body: UpdateApplicationDto,
  ): Promise<ApplicationResponseDto> {
    const userId = user?.id;

    if (!userId) {
      throw new UnauthorizedException('Unauthorized');
    }

    return this.applicationService.updateApplication(userId, id, body);
  }

  @Delete(':id')
  deleteApplication(
    @CurrentUser() user: JwtUser | undefined,
    @Param('id') id: string,
  ): Promise<ApplicationResponseDto> {
    const userId = user?.id;

    if (!userId) {
      throw new UnauthorizedException('Unauthorized');
    }

    return this.applicationService.deleteApplication(userId, id);
  }
}
