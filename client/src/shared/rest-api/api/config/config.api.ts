import { internalApiFetcher } from "@/pkg/library/rest-api/fetcher";
import { QueryFunctionContext } from "@tanstack/react-query";
import { EConfigApi, IConfigRequest, IConfigResponse } from "../../interface";

// get config api
export const configQueryApi = async (
  opt: QueryFunctionContext,
): Promise<IConfigResponse> => {
  const response = await internalApiFetcher.get(EConfigApi.API_CONFIG, {
    signal: opt.signal,
  });

  return response.json<IConfigResponse>();
};

// update config api
export const configMutationApi = async (
  request: IConfigRequest,
  signal?: AbortSignal,
): Promise<IConfigResponse> => {
  const response = await internalApiFetcher.post(EConfigApi.API_CONFIG, {
    json: request,
    signal,
  });

  if (!response.ok) {
    throw new Error(`Config update failed: ${response.status}`);
  }

  return response.json<IConfigResponse>();
};
