"use client";

import { useGetUpcomingEventsQuery } from "@/shared/rest-api/api/application-events";

export const useDashboardUpcomingService = () => {
  const upcomingQuery = useGetUpcomingEventsQuery({ limit: 7 });

  return {
    events: upcomingQuery.data?.data?.items ?? [],
    isError: upcomingQuery.isError || upcomingQuery.data?.success === false,
    isPending: upcomingQuery.isPending,
    totalItems: upcomingQuery.data?.data?.totalItems ?? 0,
  };
};
