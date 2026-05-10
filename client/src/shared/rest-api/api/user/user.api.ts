import { restApiFetcher } from "@/pkg/library/rest-api/fetcher";
import { EUserApi, IUserResponse } from "../../interface";

// get user api
export const getUserApi = async (): Promise<IUserResponse> => {
  const response = await restApiFetcher.get(EUserApi.API_USER);

  return response.json();
};
