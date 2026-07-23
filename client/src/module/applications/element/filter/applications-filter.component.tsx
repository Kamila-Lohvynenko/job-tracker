"use client";

import { StatusChipComponent } from "@/shared/components/status-chip";
import { EApplicationStatus } from "@/shared/rest-api/interface";
import { useApplicationsFilterService } from "./applications-filter.service";

const FilterComponent = () => {
  const thisService = useApplicationsFilterService();

  return (
    <div>
      <div className={"flex flex-wrap gap-2 mb-4"}>
        {Object.values(EApplicationStatus).map((status) => {
          const isActive = thisService.filter.status.includes(status);

          return (
            <StatusChipComponent
              key={status}
              status={status}
              isClickable
              isBg={isActive}
              variant="bordered"
              onClick={() => thisService.handleStatusChangeImmediate(status)}
              onClose={() => thisService.handleStatusChangeImmediate(status)}
              isCloseable={isActive}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FilterComponent;
