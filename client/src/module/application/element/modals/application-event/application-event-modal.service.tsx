import { useApplicationStore } from "@/module/application/application.store";

export function useApplicationEventModalService() {
  const isOpen = useApplicationStore((state) => state.isEventModalOpen);
  const eventToEdit = useApplicationStore((state) => state.eventToEdit);
  const handleApplicationStore = useApplicationStore(
    (state) => state.handleApplicationStore,
  );

  const closeModal = () => {
    handleApplicationStore({
      isEventModalOpen: false,
      eventToEdit: null,
    });
  };

  return {
    isOpen,
    isEdit: Boolean(eventToEdit),
    closeModal,
  };
}
