import { restApiFetcher } from "@/pkg/library/rest-api/fetcher";
import {
  EApplicationEventsApi,
  EApplicationsApi,
  IApplicationEventRequest,
  IApplicationEventResponse,
  IApplicationEventsRequest,
  IApplicationEventsResponse,
  ICreateApplicationEventRequest,
  IDeleteApplicationEventRequest,
  IUpcomingEventsRequest,
  IUpcomingEventsResponse,
  IUpdateApplicationEventRequest,
} from "../../interface";

// get application events api
export const getApplicationEventsApi = async (
  request: IApplicationEventsRequest,
): Promise<IApplicationEventsResponse> => {
  const response = await restApiFetcher.get(
    `${EApplicationsApi.API_APPLICATIONS}/${request.applicationId}/${EApplicationEventsApi.API_APPLICATION_EVENTS}`,
    {
      searchParams: request.params as Record<string, string | number | boolean>,
    },
  );

  return response.json();
};

// get upcoming events api
export const getUpcomingEventsApi = async (
  request: IUpcomingEventsRequest,
): Promise<IUpcomingEventsResponse> => {
  const response = await restApiFetcher.get(
    EApplicationEventsApi.API_UPCOMING_EVENTS,
    {
      searchParams: request as Record<string, string | number | boolean>,
    },
  );

  return response.json();
};

// get application event api
export const getApplicationEventApi = async (
  request: IApplicationEventRequest,
): Promise<IApplicationEventResponse> => {
  const response = await restApiFetcher.get(
    `${EApplicationsApi.API_APPLICATIONS}/${request.applicationId}/${EApplicationEventsApi.API_APPLICATION_EVENTS}/${request.eventId}`,
  );

  return response.json();
};

// create application event api
export const createApplicationEventApi = async (
  request: ICreateApplicationEventRequest,
): Promise<IApplicationEventResponse> => {
  const response = await restApiFetcher.post(
    `${EApplicationsApi.API_APPLICATIONS}/${request.applicationId}/${EApplicationEventsApi.API_APPLICATION_EVENTS}`,
    {
      json: request.data,
    },
  );

  return response.json();
};

// update application event api
export const updateApplicationEventApi = async (
  request: IUpdateApplicationEventRequest,
): Promise<IApplicationEventResponse> => {
  const response = await restApiFetcher.patch(
    `${EApplicationsApi.API_APPLICATIONS}/${request.applicationId}/${EApplicationEventsApi.API_APPLICATION_EVENTS}/${request.eventId}`,
    {
      json: request.data,
    },
  );

  return response.json();
};

// delete application event api
export const deleteApplicationEventApi = async (
  request: IDeleteApplicationEventRequest,
): Promise<IApplicationEventResponse> => {
  const response = await restApiFetcher.delete(
    `${EApplicationsApi.API_APPLICATIONS}/${request.applicationId}/${EApplicationEventsApi.API_APPLICATION_EVENTS}/${request.eventId}`,
  );

  return response.json();
};
