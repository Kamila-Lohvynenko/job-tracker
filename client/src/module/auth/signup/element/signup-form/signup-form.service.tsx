import { zodResolver } from "@hookform/resolvers/zod";
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

  const { control, handleSubmit, watch } = useForm<SignupFormSchema>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: formDefaultValues,
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
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
  };
};
