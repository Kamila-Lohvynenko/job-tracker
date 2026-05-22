import { useSigninMutation } from "@/shared/rest-api/api/signin/signin.hook";
import { ERoutes } from "@/shared/routes/routes.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createSigninFormSchema, SigninFormSchema } from "./signin-form.schema";

const formDefaultValues: SigninFormSchema = {
  email: "",
  password: "",
};

// service
export const SigninFormService = () => {
  const signinFormSchema = createSigninFormSchema();
  const { mutateAsync: signinMutation, isPending } = useSigninMutation();
  const [error, setError] = useState<number | null>(null);

  const router = useRouter();

  const { control, handleSubmit, getValues } = useForm<SigninFormSchema>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: formDefaultValues,
  });

  const onSubmit = handleSubmit(async (data) => {
    const response = await signinMutation(data);
    console.log(response);
    if (response.success) {
      router.push(ERoutes.DASHBOARD);
    } else {
      setError(response.status);
    }
  });

  return {
    control,
    onSubmit,
    isAuthorizedError: error === 401,
    isEmailNotVerifiedError: error === 403,
    isPending,
    email: getValues("email"),
  };
};
