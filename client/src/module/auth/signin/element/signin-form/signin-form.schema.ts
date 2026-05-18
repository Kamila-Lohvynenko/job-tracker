import * as m from "@/paraglide/messages";
import { z } from "zod";

export const createSigninFormSchema = () =>
  z.object({
    email: z
      .string()
      .min(1, m.signup_form_email_required())
      .email(m.signup_form_email_required()),

    password: z.string().min(1, m.signup_form_password_required()),
  });

export type SigninFormSchema = z.infer<
  ReturnType<typeof createSigninFormSchema>
>;
