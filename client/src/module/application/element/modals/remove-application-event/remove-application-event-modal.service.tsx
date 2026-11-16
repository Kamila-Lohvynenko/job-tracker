import { useApplicationStore } from "@/module/application/application.store";
import * as m from "@/paraglide/messages";
import { useDeleteApplicationEventMutation } from "@/shared/rest-api/api/application-events";
import { EApplicationEventsKey } from "@/shared/rest-api/interface";
import { toast } from "@heroui/react";
import { useQueryClient } from "@tanstack/react-query";

export function useRemoveApplicationEventModalService() {
  const eventToDelete = useApplicationStore((state) => state.eventToDelete);
  const handleApplicationStore = useApplicationStore(
    (state) => state.handleApplicationStore,
  );

  const { mutateAsync: deleteApplicationEvent, isPending } =
    useDeleteApplicationEventMutation();
  const queryClient = useQueryClient();

  const closeModal = () => {
    handleApplicationStore({ eventToDelete: null });
  };

  const onConfirm = async () => {
    if (!eventToDelete) return;

    try {
      const response = await deleteApplicationEvent({
        applicationId: eventToDelete.applicationId,
        eventId: eventToDelete.id,
      });

      if (response.success) {
        await queryClient.refetchQueries({
          queryKey: [EApplicationEventsKey.APPLICATION_EVENTS_QUERY],
        });
        toast.success(m.remove_application_event_modal_toast_success());
        closeModal();
      } else {
        toast.danger(m.remove_application_event_modal_toast_error());
      }
    } catch {
      toast.danger(m.remove_application_event_modal_toast_error());
    }
  };

  return {
    isOpen: eventToDelete !== null,
    isPending,
    closeModal,
    onConfirm,
  };
}
