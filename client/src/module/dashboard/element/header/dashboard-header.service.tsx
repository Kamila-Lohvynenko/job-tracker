"use client";

import { useApplicationsStore } from "@/module/applications/applications.store";
import * as m from "@/paraglide/messages";
import { useGetUpcomingEventsQuery } from "@/shared/rest-api/api/application-events";
import { useGetApplicationsSummaryQuery } from "@/shared/rest-api/api/applications";
import { useGetUserQuery } from "@/shared/rest-api/api/user";
import { formatDate } from "@/shared/utils";
import { useParams } from "next/navigation";
import {
  getCurrentWeekRange,
  getDashboardCounts,
} from "../../util/dashboard.util";

export const useDashboardHeaderService = () => {
  const { locale = "en" } = useParams<{ locale: string }>();
  const { data: userData, isPending: isUserPending } = useGetUserQuery();
  const summaryQuery = useGetApplicationsSummaryQuery(getCurrentWeekRange());
  const upcomingQuery = useGetUpcomingEventsQuery({ limit: 7 });
  const handleApplicationsStore = useApplicationsStore(
    (state) => state.handleApplicationsStore,
  );

  const firstName = userData?.data?.name?.split(" ")[0];
  const greeting = firstName
    ? m.dashboard_greeting({ name: firstName })
    : m.dashboard_greeting_fallback();

  const { active, total } = getDashboardCounts(summaryQuery.data?.data);
  const nextEvent = upcomingQuery.data?.data?.items[0];
  const nextDate = nextEvent?.eventDate
    ? formatDate(nextEvent.eventDate, locale).dateLabel
    : null;

  const isSummaryReady =
    summaryQuery.isSuccess && summaryQuery.data?.success === true;
  const isSummaryPending =
    summaryQuery.isPending || (total > 0 && upcomingQuery.isPending);

  const summary =
    !isSummaryPending && isSummaryReady && total > 0
      ? nextEvent && nextDate
        ? m.dashboard_summary_with_next({
            count: String(active),
            title: nextEvent.title,
            company: nextEvent.company,
            date: nextDate,
          })
        : m.dashboard_summary_active({ count: String(active) })
      : null;

  const openAddApplicationModal = () => {
    handleApplicationsStore({ modalType: "add" });
  };

  return {
    greeting,
    isSummaryPending,
    isUserPending,
    openAddApplicationModal,
    showAddButton:
      summaryQuery.isPending || !isSummaryReady || total > 0,
    summary,
  };
};
