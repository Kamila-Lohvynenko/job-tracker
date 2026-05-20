import * as m from "@/paraglide/messages";
import { z } from "zod";

export const createVerifyEmailFormSchema = () =>
  z.object({
    code: z
      .string()
      .min(1, m.verify_email_form_code_required())
      .min(6, m.verify_email_form_code_min_length()),
  });

export type VerifyEmailFormSchema = z.infer<
  ReturnType<typeof createVerifyEmailFormSchema>
>;
