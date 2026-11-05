import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CurrentUser,
  JwtUser,
} from '../auth/decorators/current-user.decorator.js';
import { ApplicationEventService } from './application-event.service.js';
import {
  ApplicationEventResponseDto,
  ApplicationEventsResponseDto,
} from './dto/application-responce.dto.js';
import { CreateApplicationEventDto } from './dto/create-application-event.dto.js';
import { UpdateApplicationEventDto } from './dto/update-application-event.dto.js';

@Controller('applications/:applicationId/events')
export class ApplicationEventController {
  constructor(
    private readonly applicationEventService: ApplicationEventService,
  ) {}

  @Get()
  getApplicationEvents(
    @CurrentUser() user: JwtUser | undefined,
    @Param('applicationId') applicationId: string,
  ): Promise<ApplicationEventsResponseDto> {
    const userId = user?.id;

    if (!userId) {
      throw new UnauthorizedException('Unauthorized');
    }

    return this.applicationEventService.getApplicationEvents(
      userId,
      applicationId,
    );
  }

  @Post()
  createApplicationEvent(
    @CurrentUser() user: JwtUser | undefined,
    @Param('applicationId') applicationId: string,
    @Body() body: CreateApplicationEventDto,
  ): Promise<ApplicationEventResponseDto> {
    const userId = user?.id;

    if (!userId) {
      throw new UnauthorizedException('Unauthorized');
    }

    return this.applicationEventService.createApplicationEvent(
      userId,
      applicationId,
      body,
    );
  }

  @Patch(':eventId')
  updateApplicationEvent(
    @CurrentUser() user: JwtUser | undefined,
    @Param('applicationId') applicationId: string,
    @Param('eventId') eventId: string,
    @Body() body: UpdateApplicationEventDto,
  ): Promise<ApplicationEventResponseDto> {
    const userId = user?.id;

    if (!userId) {
      throw new UnauthorizedException('Unauthorized');
    }

    return this.applicationEventService.updateApplicationEvent(
      userId,
      applicationId,
      eventId,
      body,
    );
  }

  @Get(':eventId')
  getApplicationEvent(
    @CurrentUser() user: JwtUser | undefined,
    @Param('applicationId') applicationId: string,
    @Param('eventId') eventId: string,
  ): Promise<ApplicationEventResponseDto> {
    const userId = user?.id;

    if (!userId) {
      throw new UnauthorizedException('Unauthorized');
    }

    return this.applicationEventService.getApplicationEvent(
      userId,
      applicationId,
      eventId,
    );
  }

  @Delete(':eventId')
  deleteApplicationEvent(
    @CurrentUser() user: JwtUser | undefined,
    @Param('applicationId') applicationId: string,
    @Param('eventId') eventId: string,
  ): Promise<ApplicationEventResponseDto> {
    const userId = user?.id;

    if (!userId) {
      throw new UnauthorizedException('Unauthorized');
    }

    return this.applicationEventService.deleteApplicationEvent(
      userId,
      applicationId,
      eventId,
    );
  }
}
