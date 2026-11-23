"use client";

import * as m from "@/paraglide/messages";
import { Alert, Skeleton } from "@heroui/react";
import DashboardUpcomingEventComponent from "./element/event/dashboard-upcoming-event.component";
import { useDashboardUpcomingService } from "./dashboard-upcoming.service";

const DashboardUpcomingComponent = () => {
  const thisService = useDashboardUpcomingService();

  return (
    <section className="overflow-hidden rounded-lg border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h2 className="text-lg font-semibold">{m.dashboard_upcoming_title()}</h2>

        {!thisService.isPending &&
          !thisService.isError &&
          thisService.totalItems > 0 && (
          <span className="text-sm text-foreground-subtle">
            {thisService.totalItems}
          </span>
        )}
      </div>

      {thisService.isError ? (
        <div className="p-4">
          <Alert
            status="danger"
            className="bg-danger-soft text-danger rounded-sm"
          >
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>{m.common_error_title()}</Alert.Title>
              <Alert.Description>
                {m.common_error_description()}
              </Alert.Description>
            </Alert.Content>
          </Alert>
        </div>
      ) : thisService.isPending ? (
        <div className="flex flex-col gap-3 p-4">
          <Skeleton className="h-12 rounded-md" />
          <Skeleton className="h-12 rounded-md" />
          <Skeleton className="h-12 rounded-md" />
        </div>
      ) : thisService.events.length === 0 ? (
        <p className="px-4 py-8 text-center text-sm text-foreground-subtle">
          {m.dashboard_upcoming_empty()}
        </p>
      ) : (
        <ul className="divide-y divide-border">
          {thisService.events.map((event) => (
            <DashboardUpcomingEventComponent key={event.id} event={event} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default DashboardUpcomingComponent;
