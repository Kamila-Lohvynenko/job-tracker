import {
  EApplicationStatus,
  IApplicationsSummaryDto,
} from "@/shared/rest-api/interface";

const CLOSED_STATUSES = new Set<EApplicationStatus>([
  EApplicationStatus.REJECTED,
  EApplicationStatus.WITHDRAWN,
]);

export const getCurrentWeekRange = () => {
  const now = new Date();
  const day = now.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;

  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  start.setDate(now.getDate() + diffToMonday);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return {
    appliedFrom: start.toISOString(),
    appliedTo: end.toISOString(),
  };
};

export const getDashboardCounts = (summary?: IApplicationsSummaryDto) => {
  const byStatus = summary?.byStatus;

  const count = (status: EApplicationStatus) => byStatus?.[status] ?? 0;

  const total = byStatus
    ? Object.values(byStatus).reduce((sum, value) => sum + value, 0)
    : 0;

  const active = byStatus
    ? (Object.entries(byStatus) as [EApplicationStatus, number][]).reduce(
        (sum, [status, value]) =>
          CLOSED_STATUSES.has(status) ? sum : sum + value,
        0,
      )
    : 0;

  return {
    active,
    inProgress:
      count(EApplicationStatus.HR_SCREEN) +
      count(EApplicationStatus.INTERVIEW) +
      count(EApplicationStatus.TAKE_HOME),
    offers: count(EApplicationStatus.OFFER),
    appliedThisWeek: summary?.appliedInRange ?? 0,
    total,
  };
};
