import { restApiFetcher } from "@/pkg/library/rest-api/fetcher";
import {
  EVerifyEmailApi,
  IResendVerificationCodeRequest,
  IResendVerificationCodeResponse,
  IVerifyEmailRequest,
  IVerifyEmailResponse,
} from "../../interface";

// verify email api
export const verifyEmailApi = async (
  request: IVerifyEmailRequest,
): Promise<IVerifyEmailResponse> => {
  const response = await restApiFetcher.post(EVerifyEmailApi.API_VERIFY_EMAIL, {
    json: request,
  });

  return response.json();
};

// resend verification code api
export const resendVerificationCodeApi = async (
  request: IResendVerificationCodeRequest,
): Promise<IResendVerificationCodeResponse> => {
  const response = await restApiFetcher.post(
    EVerifyEmailApi.API_RESEND_VERIFICATION_CODE,
    {
      json: request,
    },
  );

  return response.json();
};
