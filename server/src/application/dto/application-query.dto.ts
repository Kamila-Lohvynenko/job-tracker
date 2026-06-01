// application-query.dto.ts

import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import type {
  ApplicationSource,
  ApplicationStatus,
  EmploymentType,
} from '../../../generated/prisma/enums.js';
import {
  ApplicationSource as PrismaApplicationSource,
  ApplicationStatus as PrismaApplicationStatus,
  EmploymentType as PrismaEmploymentType,
} from '../../../generated/prisma/enums.js';

export enum PrismaOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class ApplicationQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(PrismaApplicationStatus)
  status?: ApplicationStatus;

  @IsOptional()
  @IsEnum(PrismaApplicationSource)
  source?: ApplicationSource;

  @IsOptional()
  @IsEnum(PrismaEmploymentType)
  employmentType?: EmploymentType;

  @IsOptional()
  @IsDateString()
  appliedFrom?: string;

  @IsOptional()
  @IsDateString()
  appliedTo?: string;

  @IsOptional()
  @IsEnum(PrismaOrder)
  order?: PrismaOrder;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit = 10;
}
