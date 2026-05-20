import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createVerifyEmailFormSchema,
  VerifyEmailFormSchema,
} from "./verify-email-form.schema";

// service
export const VerifyEmailFormService = () => {
  const verifyEmailFormSchema = createVerifyEmailFormSchema();

  const { control, handleSubmit } = useForm<VerifyEmailFormSchema>({
    resolver: zodResolver(verifyEmailFormSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  });

  return {
    control,
    onSubmit,
  };
};
