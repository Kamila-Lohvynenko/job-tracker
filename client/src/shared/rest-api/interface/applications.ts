import { IApiResponse } from "./common";

export enum EApplicationsApi {
  API_APPLICATIONS = "applications",
}

export enum EApplicationsKey {
  APPLICATIONS_QUERY = "applications_query",
  APPLICATION_QUERY = "application_query",
  CREATE_APPLICATION_MUTATION = "create_application_mutation",
  UPDATE_APPLICATION_MUTATION = "update_application_mutation",
  DELETE_APPLICATION_MUTATION = "delete_application_mutation",
}

export enum EApplicationStatus {
  WISHLIST = "WISHLIST",
  APPLIED = "APPLIED",
  HR_SCREEN = "HR_SCREEN",
  INTERVIEW = "INTERVIEW",
  TECHNICAL = "TECHNICAL",
  TAKE_HOME = "TAKE_HOME",
  FINAL = "FINAL",
  OFFER = "OFFER",
  REJECTED = "REJECTED",
  WITHDRAWN = "WITHDRAWN",
  ARCHIVED = "ARCHIVED",
}

export enum EApplicationSource {
  LINKEDIN = "LINKEDIN",
  INDEED = "INDEED",
  COMPANY_WEBSITE = "COMPANY_WEBSITE",
  WELLFOUND = "WELLFOUND",
  GLASSDOOR = "GLASSDOOR",
  REFERRAL = "REFERRAL",
  RECRUITER = "RECRUITER",
  EMAIL = "EMAIL",
  OTHER = "OTHER",
}

export enum EEmploymentType {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  CONTRACT = "CONTRACT",
  INTERNSHIP = "INTERNSHIP",
  FREELANCE = "FREELANCE",
  TEMPORARY = "TEMPORARY",
}

export enum EWorkLocation {
  REMOTE = "REMOTE",
  HYBRID = "HYBRID",
  ON_SITE = "ON_SITE",
  FLEXIBLE = "FLEXIBLE",
  OTHER = "OTHER",
}

export enum EPrismaOrder {
  ASC = "asc",
  DESC = "desc",
}

export interface IApplicationDto {
  id: string;
  company: string;
  role: string;
  status: EApplicationStatus;
  source: EApplicationSource | null;
  jobLink: string | null;
  location: string | null;
  employmentType: EEmploymentType | null;
  workLocation: EWorkLocation | null;
  salaryMin: number | null;
  salaryMax: number | null;
  currency: string | null;
  notes: string | null;
  appliedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface IApplicationsRequest {
  search?: string;
  status?: EApplicationStatus | EApplicationStatus[];
  source?: EApplicationSource;
  employmentType?: EEmploymentType;
  workLocation?: EWorkLocation;
  appliedFrom?: string;
  appliedTo?: string;
  order?: EPrismaOrder;
  page?: number;
  limit?: number;
}

export interface IApplicationsListDto {
  items: IApplicationDto[];
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}

export interface IApplicationsResponse extends IApiResponse {
  data: IApplicationsListDto;
}

export interface IApplicationRequest {
  id: string;
}

export interface IApplicationResponse extends IApiResponse {
  data: IApplicationDto;
}

export interface ICreateApplicationRequest {
  company: string;
  role: string;
  status?: EApplicationStatus;
  source?: EApplicationSource;
  jobLink?: string;
  location?: string;
  employmentType?: EEmploymentType;
  workLocation?: EWorkLocation;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  notes?: string;
  appliedAt: string;
}

export type IUpdateApplicationRequest = Partial<ICreateApplicationRequest>;
