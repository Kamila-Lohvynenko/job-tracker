import * as m from "@/paraglide/messages";
import { useApplicationsStore } from "@/module/applications/applications.store";
import { useDeleteApplicationMutation } from "@/shared/rest-api/api/applications";
import { EApplicationsKey } from "@/shared/rest-api/interface";
import { toast } from "@heroui/react";
import { useQueryClient } from "@tanstack/react-query";

export function useRemoveApplicationModalService() {
  const modalType = useApplicationsStore((state) => state.modalType);
  const applicationIdToDelete = useApplicationsStore(
    (state) => state.applicationIdToDelete,
  );
  const handleApplicationsStore = useApplicationsStore(
    (state) => state.handleApplicationsStore,
  );

  const { mutateAsync: deleteApplicationMutation, isPending } =
    useDeleteApplicationMutation();
  const queryClient = useQueryClient();

  const closeModal = () => {
    handleApplicationsStore({ modalType: null, applicationIdToDelete: null });
  };

  const onConfirm = async () => {
    if (!applicationIdToDelete) return;

    try {
      const response = await deleteApplicationMutation({
        id: applicationIdToDelete,
      });

      if (response.success) {
        await queryClient.refetchQueries({
          queryKey: [EApplicationsKey.APPLICATIONS_QUERY],
        });
        toast.success(m.remove_application_modal_toast_success());
        closeModal();
      } else {
        toast.danger(m.remove_application_modal_toast_error());
      }
    } catch {
      toast.danger(m.remove_application_modal_toast_error());
    }
  };

  return {
    isOpen: modalType === "remove",
    isPending,
    closeModal,
    onConfirm,
  };
}
