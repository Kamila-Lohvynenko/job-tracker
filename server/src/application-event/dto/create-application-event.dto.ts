import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  ApplicationEventStatus,
  ApplicationEventType,
} from '../../../generated/prisma/enums.js';

export class CreateApplicationEventDto {
  @IsEnum(ApplicationEventType)
  type: ApplicationEventType;

  @IsOptional()
  @IsEnum(ApplicationEventStatus)
  status?: ApplicationEventStatus;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  eventDate: string;

  @IsOptional()
  @IsBoolean()
  updateApplicationStatus?: boolean;
}
