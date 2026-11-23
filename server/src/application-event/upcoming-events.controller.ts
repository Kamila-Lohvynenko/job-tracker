import { Controller, Get, Query, UnauthorizedException } from '@nestjs/common';
import {
  CurrentUser,
  JwtUser,
} from '../auth/decorators/current-user.decorator.js';
import { ApplicationEventService } from './application-event.service.js';
import { UpcomingApplicationEventsResponseDto } from './dto/application-responce.dto.js';
import { UpcomingEventsQueryDto } from './dto/upcoming-events-query.dto.js';

@Controller('events')
export class UpcomingEventsController {
  constructor(
    private readonly applicationEventService: ApplicationEventService,
  ) {}

  @Get('upcoming')
  getUpcomingEvents(
    @CurrentUser() user: JwtUser | undefined,
    @Query() query: UpcomingEventsQueryDto,
  ): Promise<UpcomingApplicationEventsResponseDto> {
    const userId = user?.id;

    if (!userId) {
      throw new UnauthorizedException('Unauthorized');
    }

    return this.applicationEventService.getUpcomingEvents(userId, query);
  }
}
