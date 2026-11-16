import * as m from "@/paraglide/messages";
import {
  EApplicationEventStatus,
  EApplicationEventType,
} from "@/shared/rest-api/interface";
import type { DateValue } from "@internationalized/date";
import { z } from "zod";

export const createApplicationEventSchema = () =>
  z.object({
    type: z.nativeEnum(EApplicationEventType),

    status: z.nativeEnum(EApplicationEventStatus),

    title: z.string().min(1, m.common_required()),

    description: z.string(),

    eventDate: z.custom<DateValue>((value) => value != null, {
      message: m.common_required(),
    }),

    updateApplicationStatus: z.boolean(),
  });

export type ApplicationEventSchema = z.infer<
  ReturnType<typeof createApplicationEventSchema>
>;
