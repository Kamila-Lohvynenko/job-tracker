"use client";

import { AddApplicationModalComponent } from "@/module/applications/element/modals/add-application";
import { useDashboardService } from "./dashboard.service";
import { DashboardCountersComponent } from "./element/counters";
import { DashboardEmptyComponent } from "./element/empty";
import { DashboardHeaderComponent } from "./element/header";
import { DashboardUpcomingComponent } from "./element/upcoming";

const DashboardModule = () => {
  const thisService = useDashboardService();

  return (
    <div className="flex flex-col gap-6 p-4">
      <DashboardHeaderComponent />

      {thisService.isEmpty ? (
        <DashboardEmptyComponent onAdd={thisService.openAddApplicationModal} />
      ) : (
        <>
          <DashboardCountersComponent />
          <DashboardUpcomingComponent />
        </>
      )}

      <AddApplicationModalComponent />
    </div>
  );
};

export default DashboardModule;
