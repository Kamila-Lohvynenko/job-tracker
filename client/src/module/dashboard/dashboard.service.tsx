"use client";

import { useApplicationsStore } from "@/module/applications/applications.store";
import { useGetApplicationsSummaryQuery } from "@/shared/rest-api/api/applications";
import { getCurrentWeekRange, getDashboardCounts } from "./util/dashboard.util";

export const useDashboardService = () => {
  const summaryQuery = useGetApplicationsSummaryQuery(getCurrentWeekRange());
  const handleApplicationsStore = useApplicationsStore(
    (state) => state.handleApplicationsStore,
  );

  const { total } = getDashboardCounts(summaryQuery.data?.data);
  const isSummaryReady =
    summaryQuery.isSuccess && summaryQuery.data?.success === true;

  const openAddApplicationModal = () => {
    handleApplicationsStore({ modalType: "add" });
  };

  return {
    isEmpty: isSummaryReady && total === 0,
    openAddApplicationModal,
  };
};
