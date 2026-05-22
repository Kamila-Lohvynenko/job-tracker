import { restApiFetcher } from "@/pkg/library/rest-api/fetcher";
import { ESignupApi, ISignupRequest, ISignupResponse } from "../../interface";

// signin api
export const signupApi = async (
  request: ISignupRequest,
): Promise<ISignupResponse> => {
  const response = await restApiFetcher.post(ESignupApi.API_SIGNUP, {
    json: request,
  });

  return response.json();
};
