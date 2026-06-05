"use client";

import {
  keepPreviousData,
  queryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import { useQuerySearchParams } from "@/pkg/hook";

import {
  EApplicationsKey,
  EApplicationSource,
  EApplicationStatus,
  EEmploymentType,
  EPrismaOrder,
  IApplicationRequest,
  IApplicationsRequest,
  IUpdateApplicationRequest,
} from "../../interface";
import {
  createApplicationApi,
  deleteApplicationApi,
  getApplicationApi,
  getApplicationsApi,
  updateApplicationApi,
} from "./applications.api";

// applications query options
const applicationsQueryOptions = (params: IApplicationsRequest) => {
  return queryOptions({
    queryKey: [EApplicationsKey.APPLICATIONS_QUERY, params],
    queryFn: () => getApplicationsApi(params),
    placeholderData: keepPreviousData,
  });
};

// get applications query hook
export const useGetApplicationsQuery = () => {
  const { searchParams } = useQuerySearchParams();

  const params: IApplicationsRequest = {
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 10,
    order: (searchParams.get("order") as EPrismaOrder) || undefined,
    search: searchParams.get("search") || undefined,
    status: (searchParams.get("status") as EApplicationStatus) || undefined,
    source: (searchParams.get("source") as EApplicationSource) || undefined,
    employmentType:
      (searchParams.get("employmentType") as EEmploymentType) || undefined,
    appliedFrom: searchParams.get("appliedFrom") || undefined,
    appliedTo: searchParams.get("appliedTo") || undefined,
  };

  return useQuery(applicationsQueryOptions(params));
};

// application query options
const applicationQueryOptions = (request: IApplicationRequest) => {
  return queryOptions({
    queryKey: [EApplicationsKey.APPLICATION_QUERY, request.id],
    queryFn: () => getApplicationApi(request),
  });
};

// get application query hook
export const useGetApplicationQuery = (request: IApplicationRequest) => {
  return useQuery(applicationQueryOptions(request));
};

// create application mutation
export const useCreateApplicationMutation = () => {
  return useMutation({
    mutationKey: [EApplicationsKey.CREATE_APPLICATION_MUTATION],
    mutationFn: createApplicationApi,
  });
};

// update application mutation
export const useUpdateApplicationMutation = () => {
  return useMutation({
    mutationKey: [EApplicationsKey.UPDATE_APPLICATION_MUTATION],
    mutationFn: (request: IApplicationRequest & IUpdateApplicationRequest) =>
      updateApplicationApi(request),
  });
};

// delete application mutation
export const useDeleteApplicationMutation = () => {
  return useMutation({
    mutationKey: [EApplicationsKey.DELETE_APPLICATION_MUTATION],
    mutationFn: deleteApplicationApi,
  });
};
