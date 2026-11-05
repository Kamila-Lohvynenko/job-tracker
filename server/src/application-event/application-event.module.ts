import { Module } from '@nestjs/common';
import { ApplicationEventController } from './application-event.controller.js';
import { ApplicationEventService } from './application-event.service.js';

@Module({
  providers: [ApplicationEventService],
  controllers: [ApplicationEventController],
})
export class ApplicationEventModule {}
