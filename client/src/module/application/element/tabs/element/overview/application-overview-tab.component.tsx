import * as m from "@/paraglide/messages";
import { Tabs } from "@heroui/react";

import { employmentTypeLabelMap, sourceLabelMap } from "@/shared/constant";
import { formatDate } from "@/shared/utils";
import { useParams } from "next/navigation";
import { useApplicationOverviewTabService } from "./application-overview-tab.service";

const ApplicationOverviewTabComponent = () => {
  const { application } = useApplicationOverviewTabService();

  const { locale = "en" } = useParams<{ locale: string }>();

  return (
    <Tabs.Panel className="pt-4" id="overview">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <p className="text-foreground-subtle">
            {m.application_overview_created_at_label()}
          </p>
          <p>
            {application?.createdAt
              ? formatDate(application?.createdAt, locale).dateLabel
              : "-"}
          </p>
        </div>

        <div className="flex flex-col gap-2 capitalize">
          <p className="text-foreground-subtle">
            {m.application_overview_source_label()}
          </p>
          <p>
            {application?.source ? sourceLabelMap[application?.source]() : "-"}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-foreground-subtle">
            {m.application_overview_salary_label()}
          </p>
          <p>
            {application?.salaryMin} - {application?.salaryMax}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-foreground-subtle">
            {m.application_overview_employment_type_label()}
          </p>
          <p>
            {application?.employmentType
              ? employmentTypeLabelMap[application?.employmentType]()
              : "-"}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-foreground-subtle">
            {m.application_overview_job_link_label()}
          </p>
          <p>{application?.jobLink}</p>
        </div>

        {application?.notes && (
          <div className="flex flex-col gap-2">
            <p className="text-foreground-subtle">
              {m.application_overview_notes_label()}
            </p>
            <p>{application?.notes}</p>
          </div>
        )}
      </div>
    </Tabs.Panel>
  );
};

export default ApplicationOverviewTabComponent;
