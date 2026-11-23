"use client";

import { useGetApplicationsSummaryQuery } from "@/shared/rest-api/api/applications";
import { getCurrentWeekRange, getDashboardCounts } from "../../util/dashboard.util";

export const useDashboardCountersService = () => {
  const summaryQuery = useGetApplicationsSummaryQuery(getCurrentWeekRange());

  return {
    ...getDashboardCounts(summaryQuery.data?.data),
    isError: summaryQuery.isError || summaryQuery.data?.success === false,
    isPending: summaryQuery.isPending,
  };
};
