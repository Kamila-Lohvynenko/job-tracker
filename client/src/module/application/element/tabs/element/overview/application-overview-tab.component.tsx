import { Tabs } from "@heroui/react";

import { employmentTypeLabelMap, sourceLabelMap } from "@/shared/constant";
import { useApplicationOverviewTabService } from "./application-overview-tab.service";

const ApplicationOverviewTabComponent = () => {
  const { application } = useApplicationOverviewTabService();

  console.log(application);

  return (
    <Tabs.Panel className="pt-4" id="overview">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <p className="text-foreground-subtle">Created At</p>
          <p>{application?.createdAt}</p>
        </div>

        <div className="flex flex-col gap-2 capitalize">
          <p className="text-foreground-subtle">Source</p>
          <p>
            {application?.source ? sourceLabelMap[application?.source]() : "-"}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-foreground-subtle">Salary</p>
          <p>
            {application?.salaryMin} - {application?.salaryMax}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-foreground-subtle">Employment Type</p>
          <p>
            {application?.employmentType
              ? employmentTypeLabelMap[application?.employmentType]()
              : "-"}
          </p>
        </div>
      </div>
    </Tabs.Panel>
  );
};

export default ApplicationOverviewTabComponent;
