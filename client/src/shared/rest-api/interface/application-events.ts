import { EOrderDirection } from "@/shared/types/global.interface";
import { IApiResponse } from "./common";

export enum EApplicationEventsApi {
  API_APPLICATION_EVENTS = "events",
  API_UPCOMING_EVENTS = "events/upcoming",
}

export enum EApplicationEventsKey {
  APPLICATION_EVENTS_QUERY = "application_events_query",
  APPLICATION_EVENT_QUERY = "application_event_query",
  CREATE_APPLICATION_EVENT_MUTATION = "create_application_event_mutation",
  UPDATE_APPLICATION_EVENT_MUTATION = "update_application_event_mutation",
  DELETE_APPLICATION_EVENT_MUTATION = "delete_application_event_mutation",
  UPCOMING_EVENTS_QUERY = "upcoming_events_query",
}

export enum EApplicationEventStatus {
  SCHEDULED = "SCHEDULED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum EApplicationEventType {
  APPLICATION_SUBMITTED = "APPLICATION_SUBMITTED",
  HR_INTERVIEW = "HR_INTERVIEW",
  INTERVIEW = "INTERVIEW",
  TECHNICAL_INTERVIEW = "TECHNICAL_INTERVIEW",
  LIVE_CODING = "LIVE_CODING",
  SYSTEM_DESIGN = "SYSTEM_DESIGN",
  TAKE_HOME_TASK = "TAKE_HOME_TASK",
  FINAL_INTERVIEW = "FINAL_INTERVIEW",
  OFFER = "OFFER",
  REJECTION = "REJECTION",
  WITHDRAWN = "WITHDRAWN",
  FOLLOW_UP = "FOLLOW_UP",
  NOTE = "NOTE",
  CUSTOM = "CUSTOM",
}

export interface IApplicationEventDto {
  id: string;
  applicationId: string;
  type: EApplicationEventType;
  status: EApplicationEventStatus;
  title: string;
  description: string | null;
  eventDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IApplicationEventsRequest {
  applicationId: string;
  params?: {
    order?: EOrderDirection;
    status?: EApplicationEventStatus | EApplicationEventStatus[];
    type?: EApplicationEventType | EApplicationEventType[];
  };
}

export interface IApplicationEventsListDto {
  items: IApplicationEventDto[];
  totalItems: number;
}

export interface IApplicationEventsResponse extends IApiResponse {
  data: IApplicationEventsListDto;
}

export interface IApplicationEventRequest {
  applicationId: string;
  eventId: string;
}

export interface IApplicationEventResponse extends IApiResponse {
  data: IApplicationEventDto;
}

export interface ICreateApplicationEventRequest {
  applicationId: string;
  data: {
    type: EApplicationEventType;
    status: EApplicationEventStatus;
    title: string;
    description?: string;
    eventDate: string;
    updateApplicationStatus?: boolean;
  };
}

export interface IUpdateApplicationEventRequest extends Omit<
  ICreateApplicationEventRequest,
  "data"
> {
  applicationId: string;
  eventId: string;
  data: Partial<ICreateApplicationEventRequest["data"]>;
}

export interface IDeleteApplicationEventRequest {
  applicationId: string;
  eventId: string;
}

export interface IUpcomingApplicationEventDto extends IApplicationEventDto {
  company: string;
  role: string;
}

export interface IUpcomingEventsRequest {
  limit?: number;
}

export interface IUpcomingEventsListDto {
  items: IUpcomingApplicationEventDto[];
  totalItems: number;
}

export interface IUpcomingEventsResponse extends IApiResponse {
  data: IUpcomingEventsListDto;
}
