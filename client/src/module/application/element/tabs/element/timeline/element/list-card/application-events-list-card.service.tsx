import { useApplicationStore } from "@/module/application/application.store";
import { eventTypeLabelMap } from "@/shared/constant";
import { IApplicationEventDto } from "@/shared/rest-api/interface";

export const ApplicationEventsListCardService = (
  applicationEvent: IApplicationEventDto,
) => {
  const handleApplicationStore = useApplicationStore(
    (state) => state.handleApplicationStore,
  );

  const openEditModal = () => {
    handleApplicationStore({
      isEventModalOpen: true,
      eventToEdit: applicationEvent,
    });
  };

  const openDeleteModal = () => {
    handleApplicationStore({
      eventToDelete: applicationEvent,
    });
  };

  return {
    openEditModal,
    openDeleteModal,
    typeLabel: eventTypeLabelMap[applicationEvent.type](),
  };
};
