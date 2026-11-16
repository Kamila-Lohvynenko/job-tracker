import { useApplicationStore } from "@/module/application/application.store";
import { localizeHref } from "@/paraglide/runtime";
import { ERoutes } from "@/shared/routes";
import { useRouter } from "next/navigation";

export const useApplicationHeaderService = () => {
  const { replace } = useRouter();
  const handleApplicationStore = useApplicationStore(
    (state) => state.handleApplicationStore,
  );

  const goBackToApplications = () => {
    replace(localizeHref(ERoutes.APPLICATIONS));
  };

  const openApplicationModal = () => {
    handleApplicationStore({
      isEventModalOpen: true,
      eventToEdit: null,
    });
  };

  // return
  return {
    goBackToApplications,
    openApplicationModal,
  };
};
