import * as m from "@/paraglide/messages";
import {
  EApplicationSource,
  EApplicationStatus,
  EEmploymentType,
  EWorkLocation,
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

    workLocation: z.nativeEnum(EWorkLocation).nullable(),

    address: z.string(),

    salary: z.string(),

    currency: z.string(),

    notes: z.string(),
  });

export type AddApplicationSchema = z.infer<
  ReturnType<typeof createAddApplicationSchema>
>;
