import { useSignupMutation } from "@/shared/rest-api/api/signup";
import { ERoutes } from "@/shared/routes/routes.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createSignupFormSchema, SignupFormSchema } from "./signup-form.schema";

const formDefaultValues: SignupFormSchema = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

// service
export const SignupFormService = () => {
  const signupFormSchema = createSignupFormSchema();
  const { mutateAsync: signupMutation, isPending } = useSignupMutation();

  const [error, setError] = useState<number | null>(null);

  const router = useRouter();

  const { control, handleSubmit, watch } = useForm<SignupFormSchema>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: formDefaultValues,
  });

  const onSubmit = handleSubmit(async (data) => {
    const response = await signupMutation(data);

    if (response.success) {
      router.push(`${ERoutes.VERIFY_EMAIL}?email=${data.email}`);
    } else {
      setError(response.status);
    }
  });

  const password = watch("password") || "";

  const passwordRules = {
    minLength: password?.length >= 8,
    hasNumber: /\d/.test(password || ""),
    hasUppercase: /[A-Z]/.test(password || ""),
  };
  return {
    control,
    onSubmit,
    passwordRules,
    isPending,
    isEmailAlreadyExistsError: error === 409,
    error: error !== null && error !== 409,
  };
};
