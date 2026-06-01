import type {
  ApplicationSource,
  ApplicationStatus,
  EmploymentType,
} from '../../../generated/prisma/enums.js';

export class ApplicationResponseDto {
  id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  source: ApplicationSource | null;
  jobLink: string | null;
  location: string | null;
  employmentType: EmploymentType | null;
  salaryMin: number | null;
  salaryMax: number | null;
  currency: string | null;
  notes: string | null;
  appliedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class ApplicationsResponseDto {
  items: ApplicationResponseDto[];
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}
