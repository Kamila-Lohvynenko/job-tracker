import { useApplicationStore } from "@/module/application/application.store";
import * as m from "@/paraglide/messages";
import {
  useCreateApplicationEventMutation,
  useUpdateApplicationEventMutation,
} from "@/shared/rest-api/api/application-events";
import {
  EApplicationEventsKey,
  EApplicationEventStatus,
  EApplicationsKey,
  IApplicationEventDto,
  EApplicationEventType,
} from "@/shared/rest-api/interface";
import { toast } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getLocalTimeZone,
  parseAbsoluteToLocal,
  today,
} from "@internationalized/date";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ApplicationEventSchema,
  createApplicationEventSchema,
} from "../../application-event.schema";

export const APPLICATION_EVENT_FORM_ID = "application-event-form";

const createDefaultValues = (): ApplicationEventSchema => ({
  type: EApplicationEventType.APPLICATION_SUBMITTED,
  status: EApplicationEventStatus.SCHEDULED,
  title: "",
  description: "",
  eventDate: today(getLocalTimeZone()),
  updateApplicationStatus: false,
});

const toFormValues = (event: IApplicationEventDto): ApplicationEventSchema => ({
  type: event.type,
  status: event.status,
  title: event.title,
  description: event.description ?? "",
  eventDate: event.eventDate
    ? parseAbsoluteToLocal(event.eventDate)
    : today(getLocalTimeZone()),
  updateApplicationStatus: false,
});

export function useApplicationEventFormService() {
  const { slug: applicationId } = useParams<{ slug: string }>();
  const [isLoading, setIsLoading] = useState(false);

  const isOpen = useApplicationStore((state) => state.isEventModalOpen);
  const eventToEdit = useApplicationStore((state) => state.eventToEdit);
  const handleApplicationStore = useApplicationStore(
    (state) => state.handleApplicationStore,
  );

  const applicationEventSchema = createApplicationEventSchema();
  const { control, handleSubmit, reset } = useForm<ApplicationEventSchema>({
    resolver: zodResolver(applicationEventSchema),
    defaultValues: createDefaultValues(),
  });

  const { mutateAsync: createApplicationEvent } =
    useCreateApplicationEventMutation();
  const { mutateAsync: updateApplicationEvent } =
    useUpdateApplicationEventMutation();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isOpen) return;

    reset(eventToEdit ? toFormValues(eventToEdit) : createDefaultValues());
  }, [isOpen, eventToEdit, reset]);

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);

    const payload = {
      type: data.type,
      status: data.status,
      title: data.title,
      description: data.description || undefined,
      eventDate: data.eventDate.toDate(getLocalTimeZone()).toISOString(),
      updateApplicationStatus: data.updateApplicationStatus,
    };

    try {
      const response = eventToEdit
        ? await updateApplicationEvent({
            applicationId,
            eventId: eventToEdit.id,
            data: payload,
          })
        : await createApplicationEvent({
            applicationId,
            data: payload,
          });

      if (response.success) {
        await queryClient.refetchQueries({
          queryKey: [EApplicationEventsKey.APPLICATION_EVENTS_QUERY],
        });

        if (data.updateApplicationStatus) {
          await queryClient.refetchQueries({
            queryKey: [EApplicationsKey.APPLICATION_QUERY, applicationId],
          });
        }

        handleApplicationStore({
          isEventModalOpen: false,
          eventToEdit: null,
        });
        toast.success(
          eventToEdit
            ? m.application_event_modal_toast_update_success()
            : m.application_event_modal_toast_create_success(),
        );
      } else {
        toast.danger(
          eventToEdit
            ? m.application_event_modal_toast_update_error()
            : m.application_event_modal_toast_create_error(),
        );
      }
    } catch {
      toast.danger(
        eventToEdit
          ? m.application_event_modal_toast_update_error()
          : m.application_event_modal_toast_create_error(),
      );
    } finally {
      setIsLoading(false);
    }
  });

  return {
    control,
    onSubmit,
    isLoading,
  };
}
