import { useApplicationsStore } from "@/module/applications/applications.store";

export function useAddApplicationModalService() {
  const modalType = useApplicationsStore((state) => state.modalType);
  const handleApplicationsStore = useApplicationsStore(
    (state) => state.handleApplicationsStore,
  );

  const closeModal = () => {
    handleApplicationsStore({ modalType: null });
  };

  return {
    isOpen: modalType === "add",
    closeModal,
  };
}
