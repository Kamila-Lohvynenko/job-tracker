"use client";

import { useApplicationsStore } from "../../applications.store";

export function useApplicationsHeaderService() {
  const handleApplicationsStore = useApplicationsStore(
    (state) => state.handleApplicationsStore,
  );

  const openAddApplicationModal = () => {
    handleApplicationsStore({ modalType: "add" });
  };

  return {
    openAddApplicationModal,
  };
}
