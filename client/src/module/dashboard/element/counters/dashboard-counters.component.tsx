"use client";

import * as m from "@/paraglide/messages";
import { Alert, Skeleton } from "@heroui/react";
import { Award, Briefcase, CalendarPlus, Hourglass } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useDashboardCountersService } from "./dashboard-counters.service";

const counterClassName =
  "flex items-start justify-between rounded-lg border border-border bg-surface p-4";

const DashboardCountersComponent = () => {
  const thisService = useDashboardCountersService();

  const counters: {
    label: string;
    value: number;
    Icon: LucideIcon;
    iconClassName: string;
  }[] = [
    {
      label: m.dashboard_counter_active(),
      value: thisService.active,
      Icon: Briefcase,
      iconClassName: "bg-primary-soft text-primary",
    },
    {
      label: m.dashboard_counter_in_progress(),
      value: thisService.inProgress,
      Icon: Hourglass,
      iconClassName: "bg-warning-soft text-warning",
    },
    {
      label: m.dashboard_counter_offers(),
      value: thisService.offers,
      Icon: Award,
      iconClassName: "bg-success-soft text-success",
    },
    {
      label: m.dashboard_counter_this_week(),
      value: thisService.appliedThisWeek,
      Icon: CalendarPlus,
      iconClassName: "bg-surface-muted text-foreground-muted",
    },
  ];

  if (thisService.isError) {
    return (
      <Alert status="danger" className="bg-danger-soft text-danger rounded-sm">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>{m.common_error_title()}</Alert.Title>
          <Alert.Description>{m.common_error_description()}</Alert.Description>
        </Alert.Content>
      </Alert>
    );
  }

  if (thisService.isPending) {
    return (
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {counters.map((counter) => (
          <Skeleton key={counter.label} className="h-24 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {counters.map(({ label, value, Icon, iconClassName }) => (
        <div key={label} className={counterClassName}>
          <div>
            <p className="text-sm text-foreground-subtle">{label}</p>
            <p className="mt-2 text-3xl font-semibold tabular-nums">{value}</p>
          </div>

          <div
            className={`flex size-9 shrink-0 items-center justify-center rounded-md ${iconClassName}`}
          >
            <Icon className="size-4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCountersComponent;
