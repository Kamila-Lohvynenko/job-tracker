"use client";

import * as m from "@/paraglide/messages";
import { Button, Skeleton } from "@heroui/react";
import { PlusIcon } from "lucide-react";
import { useDashboardHeaderService } from "./dashboard-header.service";

const DashboardHeaderComponent = () => {
  const thisService = useDashboardHeaderService();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        {thisService.isUserPending ? (
          <Skeleton className="h-9 w-56 rounded-md" />
        ) : (
          <h1 className="text-3xl font-bold">{thisService.greeting}</h1>
        )}

        {thisService.isSummaryPending ? (
          <Skeleton className="mt-3 h-5 w-full max-w-xl rounded-md" />
        ) : (
          thisService.summary && (
            <p className="mt-2 max-w-2xl text-sm text-foreground-subtle">
              {thisService.summary}
            </p>
          )
        )}
      </div>

      {thisService.showAddButton && (
        <Button
          onPress={thisService.openAddApplicationModal}
          className="bg-primary text-white hover:bg-primary-hover"
        >
          <PlusIcon className="size-4" />

          <span>{m.applications_add_button_label()}</span>
        </Button>
      )}
    </div>
  );
};

export default DashboardHeaderComponent;
