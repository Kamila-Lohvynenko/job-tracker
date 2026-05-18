import * as m from "@/paraglide/messages";
import { z } from "zod";

export const createSignupFormSchema = () =>
  z
    .object({
      name: z.string().min(1, m.signup_form_name_required()),

      email: z
        .string()
        .min(1, m.signup_form_email_required())
        .email(m.signup_form_email_required()),

      password: z
        .string()
        .min(1, m.signup_form_password_required())
        .min(8, m.signup_form_password_should_be_valid())
        .regex(/\d/, m.signup_form_password_should_be_valid())
        .regex(/[A-Z]/, m.signup_form_password_should_be_valid()),

      confirmPassword: z
        .string()
        .min(1, m.signup_form_confirm_password_required())
        .min(8, m.signup_form_password_should_be_valid()),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: m.signup_form_passwords_do_not_match(),
      path: ["confirmPassword"],
    });

export type SignupFormSchema = z.infer<
  ReturnType<typeof createSignupFormSchema>
>;
