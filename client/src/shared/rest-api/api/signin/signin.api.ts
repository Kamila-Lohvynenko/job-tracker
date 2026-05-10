import { restApiFetcher } from "@/pkg/library/rest-api/fetcher";
import { ESigninApi, ISigninRequest, ISigninResponse } from "../../interface";

// signin api
export const signinApi = async (
  request: ISigninRequest,
): Promise<ISigninResponse> => {
  const response = await restApiFetcher.post(ESigninApi.API_SIGNIN, {
    json: request,
  });

  return response.json();
};
