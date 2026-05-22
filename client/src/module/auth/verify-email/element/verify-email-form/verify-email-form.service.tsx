import { useVerifyEmailMutation } from "@/shared/rest-api/api/verify-email";
import { ERoutes } from "@/shared/routes/routes.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  createVerifyEmailFormSchema,
  VerifyEmailFormSchema,
} from "./verify-email-form.schema";

// service
export const VerifyEmailFormService = () => {
  const params = useSearchParams();
  const email = params.get("email");
  if (!email) {
    redirect(ERoutes.SIGNIN);
  }

  const [error, setError] = useState<number | null>(null);

  const { mutateAsync: verifyEmailMutation, isPending: isVerifyEmailPending } =
    useVerifyEmailMutation();

  const verifyEmailFormSchema = createVerifyEmailFormSchema();
  const { control, handleSubmit } = useForm<VerifyEmailFormSchema>({
    resolver: zodResolver(verifyEmailFormSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const response = await verifyEmailMutation({ email, code: data.code });
    if (response.success) {
      redirect(ERoutes.SIGNIN);
    } else {
      setError(response.status);
    }
  });

  // return
  return {
    control,
    onSubmit,
    isVerifyEmailPending,
    error: error !== null && error !== 401,
    isInvalidCodeError: error === 401,
  };
};
