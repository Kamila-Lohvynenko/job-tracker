import { useResendVerificationCodeMutation } from "@/shared/rest-api/api/verify-email";
import { ERoutes } from "@/shared/routes/routes.interface";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";

// service
export const VerifyEmailService = () => {
  const params = useSearchParams();
  const email = params.get("email");
  if (!email) {
    redirect(ERoutes.SIGNIN);
  }

  const [error, setError] = useState<number | null>(null);

  const {
    mutateAsync: resendVerificationCodeMutation,
    isPending: isResendVerificationCodePending,
  } = useResendVerificationCodeMutation();

  const resendVerificationEmail = async () => {
    const response = await resendVerificationCodeMutation({ email });
    if (!response?.success) {
      setError(response.status);
    }
  };

  return {
    error,
    isResendVerificationCodePending,
    resendVerificationEmail,
  };
};
