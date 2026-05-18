import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createSigninFormSchema, SigninFormSchema } from "./signin-form.schema";

const formDefaultValues: SigninFormSchema = {
  email: "",
  password: "",
};

// service
export const SigninFormService = () => {
  const signinFormSchema = createSigninFormSchema();

  const { control, handleSubmit } = useForm<SigninFormSchema>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: formDefaultValues,
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  });

  return {
    control,
    onSubmit,
  };
};
