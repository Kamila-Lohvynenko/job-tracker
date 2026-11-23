import { IsDateString, IsOptional } from 'class-validator';

export class ApplicationSummaryQueryDto {
  @IsOptional()
  @IsDateString()
  appliedFrom?: string;

  @IsOptional()
  @IsDateString()
  appliedTo?: string;
}
