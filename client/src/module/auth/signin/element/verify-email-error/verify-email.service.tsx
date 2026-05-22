"use client";

import { ERoutes } from "@/shared/routes/routes.interface";
import { useRouter } from "next/navigation";

// service
export const VerifyEmailErrorService = (email: string) => {
  const router = useRouter();

  const resendVerificationEmail = () => {
    router.push(`${ERoutes.VERIFY_EMAIL}?email=${email}`);
  };

  return {
    resendVerificationEmail,
  };
};
