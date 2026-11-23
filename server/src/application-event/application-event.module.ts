import { Module } from '@nestjs/common';
import { ApplicationEventController } from './application-event.controller.js';
import { ApplicationEventService } from './application-event.service.js';
import { UpcomingEventsController } from './upcoming-events.controller.js';

@Module({
  providers: [ApplicationEventService],
  controllers: [ApplicationEventController, UpcomingEventsController],
})
export class ApplicationEventModule {}
