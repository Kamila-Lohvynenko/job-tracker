import * as m from "@/paraglide/messages";
import type { DateValue } from "@internationalized/date";
import { z } from "zod";

export const createAddApplicationSchema = () =>
  z.object({
    company: z.string().min(1, m.common_required()),

    role: z.string().min(1, m.common_required()),

    status: z.string().min(1, m.common_required()),

    applied_at: z.custom<DateValue>((value) => value != null, {
      message: m.common_required(),
    }),

    source: z.string(),

    link: z.string(),

    employment_type: z.string(),

    work_location: z.string(),

    address: z.string(),

    salary: z.string(),

    currency: z.string(),

    notes: z.string(),
  });

export type AddApplicationSchema = z.infer<
  ReturnType<typeof createAddApplicationSchema>
>;
