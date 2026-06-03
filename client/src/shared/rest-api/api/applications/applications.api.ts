import { restApiFetcher } from "@/pkg/library/rest-api/fetcher";
import {
  EApplicationsApi,
  IApplicationRequest,
  IApplicationResponse,
  IApplicationsRequest,
  IApplicationsResponse,
  ICreateApplicationRequest,
  IUpdateApplicationRequest,
} from "../../interface";

// get applications api
export const getApplicationsApi = async (
  request: IApplicationsRequest,
): Promise<IApplicationsResponse> => {
  const response = await restApiFetcher.get(EApplicationsApi.API_APPLICATIONS, {
    searchParams: request as Record<string, string | number | boolean>,
  });

  return response.json();
};

// get application api
export const getApplicationApi = async (
  request: IApplicationRequest,
): Promise<IApplicationResponse> => {
  const response = await restApiFetcher.get(
    `${EApplicationsApi.API_APPLICATIONS}/${request.id}`,
  );

  return response.json();
};

// create application api
export const createApplicationApi = async (
  request: ICreateApplicationRequest,
): Promise<IApplicationResponse> => {
  const response = await restApiFetcher.post(EApplicationsApi.API_APPLICATIONS, {
    json: request,
  });

  return response.json();
};

// update application api
export const updateApplicationApi = async (
  request: IApplicationRequest & IUpdateApplicationRequest,
): Promise<IApplicationResponse> => {
  const { id, ...body } = request;

  const response = await restApiFetcher.patch(
    `${EApplicationsApi.API_APPLICATIONS}/${id}`,
    {
      json: body,
    },
  );

  return response.json();
};

// delete application api
export const deleteApplicationApi = async (
  request: IApplicationRequest,
): Promise<IApplicationResponse> => {
  const response = await restApiFetcher.delete(
    `${EApplicationsApi.API_APPLICATIONS}/${request.id}`,
  );

  return response.json();
};
