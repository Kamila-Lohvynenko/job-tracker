import type {
  ApplicationEventStatus,
  ApplicationEventType,
} from '../../../generated/prisma/enums.js';

export class ApplicationEventResponseDto {
  id: string;
  applicationId: string;
  type: ApplicationEventType;
  status: ApplicationEventStatus;
  title: string;
  description: string | null;
  eventDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export class ApplicationEventsResponseDto {
  items: ApplicationEventResponseDto[];
  totalItems: number;
}
