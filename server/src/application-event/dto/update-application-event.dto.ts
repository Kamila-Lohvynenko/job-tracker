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

export class UpdateApplicationEventDto {
  @IsOptional()
  @IsEnum(ApplicationEventType)
  type?: ApplicationEventType;

  @IsOptional()
  @IsEnum(ApplicationEventStatus)
  status?: ApplicationEventStatus;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  eventDate?: string;

  @IsOptional()
  @IsBoolean()
  updateApplicationStatus?: boolean;
}
