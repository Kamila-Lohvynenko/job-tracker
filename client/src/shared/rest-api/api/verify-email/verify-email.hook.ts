import { useMutation } from "@tanstack/react-query";
import { EVerifyEmailKey } from "../../interface";
import { resendVerificationCodeApi, verifyEmailApi } from "./verify-email.api";

// verify email mutation
export const useVerifyEmailMutation = () => {
  return useMutation({
    mutationKey: [EVerifyEmailKey.VERIFY_EMAIL_MUTATION],
    mutationFn: verifyEmailApi,
  });
};

// resend verification code mutation
export const useResendVerificationCodeMutation = () => {
  return useMutation({
    mutationKey: [EVerifyEmailKey.RESEND_VERIFICATION_CODE_MUTATION],
    mutationFn: resendVerificationCodeApi,
  });
};
