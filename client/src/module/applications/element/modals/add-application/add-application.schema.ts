import * as m from "@/paraglide/messages";
import {
  EApplicationSource,
  EApplicationStatus,
  EEmploymentType,
  ELocation,
} from "@/shared/rest-api/interface";
import type { DateValue } from "@internationalized/date";
import { z } from "zod";

export const createAddApplicationSchema = () =>
  z.object({
    company: z.string().min(1, m.common_required()),

    role: z.string().min(1, m.common_required()),

    status: z.nativeEnum(EApplicationStatus),

    appliedAt: z.custom<DateValue>((value) => value != null, {
      message: m.common_required(),
    }),

    source: z.nativeEnum(EApplicationSource).nullable(),

    link: z.string(),

    employmentType: z.nativeEnum(EEmploymentType).nullable(),

    location: z.nativeEnum(ELocation).nullable(),

    address: z.string(),

    salaryMin: z
      .string()
      .refine((value) => value.trim() === "" || /^\d+$/.test(value.trim()), {
        message: m.add_application_modal_salary_invalid(),
      }),

    salaryMax: z
      .string()
      .refine((value) => value.trim() === "" || /^\d+$/.test(value.trim()), {
        message: m.add_application_modal_salary_invalid(),
      }),

    currency: z.string(),

    notes: z.string(),
  })
  .superRefine((data, ctx) => {
    if (!data.salaryMin.trim() || !data.salaryMax.trim()) {
      return;
    }

    if (Number(data.salaryMin) > Number(data.salaryMax)) {
      ctx.addIssue({
        code: "custom",
        path: ["salaryMax"],
        message: m.add_application_modal_salary_range(),
      });
    }
  });

export type AddApplicationSchema = z.infer<
  ReturnType<typeof createAddApplicationSchema>
>;
