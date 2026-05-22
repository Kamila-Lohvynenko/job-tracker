import { IApiResponse } from "./common";

export enum EVerifyEmailApi {
  API_VERIFY_EMAIL = "auth/verify-email",
  API_RESEND_VERIFICATION_CODE = "auth/resend-verification-code",
}

export enum EVerifyEmailKey {
  VERIFY_EMAIL_MUTATION = "verify_email_mutation",
  RESEND_VERIFICATION_CODE_MUTATION = "resend_verification_code_mutation",
}

export interface IVerifyEmailRequest {
  email: string;
  code: string;
}

export interface IVerifyEmailResponse extends IApiResponse {
  message: string;
}

export interface IResendVerificationCodeRequest {
  email: string;
}

export interface IResendVerificationCodeResponse extends IApiResponse {
  message: string;
}
