import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ApplicationEventStatus,
  ApplicationEventType,
  ApplicationStatus,
} from '../../generated/prisma/enums.js';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  ApplicationEventResponseDto,
  ApplicationEventsResponseDto,
} from './dto/application-responce.dto.js';
import { CreateApplicationEventDto } from './dto/create-application-event.dto.js';
import { UpdateApplicationEventDto } from './dto/update-application-event.dto.js';

const applicationStatusByEventType: Partial<
  Record<ApplicationEventType, ApplicationStatus>
> = {
  [ApplicationEventType.APPLICATION_SUBMITTED]: ApplicationStatus.APPLIED,
  [ApplicationEventType.HR_INTERVIEW]: ApplicationStatus.HR_SCREEN,
  [ApplicationEventType.INTERVIEW]: ApplicationStatus.INTERVIEW,
  [ApplicationEventType.TECHNICAL_INTERVIEW]: ApplicationStatus.INTERVIEW,
  [ApplicationEventType.LIVE_CODING]: ApplicationStatus.INTERVIEW,
  [ApplicationEventType.SYSTEM_DESIGN]: ApplicationStatus.INTERVIEW,
  [ApplicationEventType.FINAL_INTERVIEW]: ApplicationStatus.INTERVIEW,
  [ApplicationEventType.TAKE_HOME_TASK]: ApplicationStatus.TAKE_HOME,
  [ApplicationEventType.OFFER]: ApplicationStatus.OFFER,
  [ApplicationEventType.REJECTION]: ApplicationStatus.REJECTED,
  [ApplicationEventType.WITHDRAWN]: ApplicationStatus.WITHDRAWN,
};

const applicationEventSelect = {
  id: true,
  applicationId: true,
  type: true,
  status: true,
  title: true,
  description: true,
  eventDate: true,
  createdAt: true,
  updatedAt: true,
} as const;

@Injectable()
export class ApplicationEventService {
  constructor(private readonly prismaService: PrismaService) {}

  async getApplicationEvents(
    userId: string,
    applicationId: string,
  ): Promise<ApplicationEventsResponseDto> {
    const application = await this.prismaService.application.findUnique({
      where: { id: applicationId, userId },
      select: { id: true },
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    const events = await this.prismaService.applicationEvent.findMany({
      where: { applicationId, userId },
      orderBy: { eventDate: 'desc' },
      select: applicationEventSelect,
    });

    return {
      items: events,
      totalItems: events.length,
    };
  }

  async getApplicationEvent(
    userId: string,
    applicationId: string,
    eventId: string,
  ): Promise<ApplicationEventResponseDto> {
    const event = await this.prismaService.applicationEvent.findUnique({
      where: { id: eventId, applicationId, userId },
      select: applicationEventSelect,
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  async createApplicationEvent(
    userId: string,
    applicationId: string,
    data: CreateApplicationEventDto,
  ): Promise<ApplicationEventResponseDto> {
    const nextStatus = this.getApplicationStatusForEvent(data);

    return this.prismaService.$transaction(async (tx) => {
      const application = await tx.application.findUnique({
        where: { id: applicationId, userId },
        select: { id: true },
      });

      if (!application) {
        throw new NotFoundException('Application not found');
      }

      const event = await tx.applicationEvent.create({
        data: {
          userId,
          applicationId,
          title: data.title,
          type: data.type,
          ...(data.status && { status: data.status }),
          ...(data.description !== undefined && {
            description: data.description,
          }),
          eventDate: new Date(data.eventDate),
        },
        select: applicationEventSelect,
      });

      if (nextStatus) {
        await tx.application.update({
          where: { id: applicationId, userId },
          data: { status: nextStatus },
        });
      }

      return event;
    });
  }

  async updateApplicationEvent(
    userId: string,
    applicationId: string,
    eventId: string,
    data: UpdateApplicationEventDto,
  ): Promise<ApplicationEventResponseDto> {
    return this.prismaService.$transaction(async (tx) => {
      const application = await tx.application.findUnique({
        where: { id: applicationId, userId },
        select: { id: true },
      });

      if (!application) {
        throw new NotFoundException('Application not found');
      }

      const existingEvent = await tx.applicationEvent.findUnique({
        where: { id: eventId, applicationId, userId },
        select: { type: true, status: true },
      });

      if (!existingEvent) {
        throw new NotFoundException('Event not found');
      }

      const event = await tx.applicationEvent.update({
        where: { id: eventId, applicationId, userId },
        data: {
          ...(data.type && { type: data.type }),
          ...(data.status && { status: data.status }),
          ...(data.title !== undefined && { title: data.title }),
          ...(data.description !== undefined && {
            description: data.description,
          }),
          ...(data.eventDate && { eventDate: new Date(data.eventDate) }),
        },
        select: applicationEventSelect,
      });

      const nextStatus = this.getApplicationStatusForEvent({
        type: data.type ?? existingEvent.type,
        status: data.status ?? existingEvent.status,
        updateApplicationStatus: data.updateApplicationStatus,
      });

      if (nextStatus) {
        await tx.application.update({
          where: { id: applicationId, userId },
          data: { status: nextStatus },
        });
      }

      return event;
    });
  }

  async deleteApplicationEvent(
    userId: string,
    applicationId: string,
    eventId: string,
  ): Promise<ApplicationEventResponseDto> {
    const event = await this.prismaService.applicationEvent.findUnique({
      where: { id: eventId, applicationId, userId },
      select: applicationEventSelect,
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    await this.prismaService.applicationEvent.delete({
      where: { id: eventId, applicationId, userId },
    });

    return event;
  }

  private getApplicationStatusForEvent(data: {
    type: ApplicationEventType;
    status?: ApplicationEventStatus;
    updateApplicationStatus?: boolean;
  }): ApplicationStatus | undefined {
    if (!data.updateApplicationStatus) {
      return undefined;
    }

    if (data.status === ApplicationEventStatus.CANCELLED) {
      return undefined;
    }

    return applicationStatusByEventType[data.type];
  }
}
