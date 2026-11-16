import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";

import {
  EApplicationEventsKey,
  IApplicationEventRequest,
  IApplicationEventsRequest,
} from "../../interface";
import {
  createApplicationEventApi,
  deleteApplicationEventApi,
  getApplicationEventApi,
  getApplicationEventsApi,
  updateApplicationEventApi,
} from "./application-events.api";

// application events query options
const applicationEventsQueryOptions = (request: IApplicationEventsRequest) => {
  return queryOptions({
    queryKey: [EApplicationEventsKey.APPLICATION_EVENTS_QUERY, request],
    queryFn: () => getApplicationEventsApi(request),
  });
};

// get application events query hook
export const useGetApplicationEventsQuery = (
  request: IApplicationEventsRequest,
) => {
  return useQuery(applicationEventsQueryOptions(request));
};

// application event query options
const applicationEventQueryOptions = (request: IApplicationEventRequest) => {
  return queryOptions({
    queryKey: [EApplicationEventsKey.APPLICATION_EVENT_QUERY, request],
    queryFn: () => getApplicationEventApi(request),
  });
};

// get application event query hook
export const useGetApplicationEventQuery = (
  request: IApplicationEventRequest,
) => {
  return useQuery(applicationEventQueryOptions(request));
};

// create application event mutation
export const useCreateApplicationEventMutation = () => {
  return useMutation({
    mutationKey: [EApplicationEventsKey.CREATE_APPLICATION_EVENT_MUTATION],
    mutationFn: createApplicationEventApi,
  });
};

// update application event mutation
export const useUpdateApplicationEventMutation = () => {
  return useMutation({
    mutationKey: [EApplicationEventsKey.UPDATE_APPLICATION_EVENT_MUTATION],
    mutationFn: updateApplicationEventApi,
  });
};

// delete application event mutation
export const useDeleteApplicationEventMutation = () => {
  return useMutation({
    mutationKey: [EApplicationEventsKey.DELETE_APPLICATION_EVENT_MUTATION],
    mutationFn: deleteApplicationEventApi,
  });
};
