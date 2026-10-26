import { CompanyItemComponent } from "@/shared/components/item/company";
import { StatusChipComponent } from "@/shared/components/status-chip";
import { EApplicationStatus } from "@/shared/rest-api/interface";
import { House, MapPin } from "lucide-react";
import { useApplicationTopService } from "./application-top.service";

// interface
interface IApplicationTopComponentProps {
  applicationId: string;
}

// component
const ApplicationTopComponent = (props: IApplicationTopComponentProps) => {
  const { applicationId } = props;
  const thisService = useApplicationTopService(applicationId);
  const application = thisService.application;

  return (
    <div className="flex gap-4 p-6 border border-gray-200 rounded-lg">
      <div className="p-4 bg-gray-100 rounded-lg">
        <CompanyItemComponent company={application?.company || ""} size="xxl" />
      </div>

      <div>
        <h1 className="text-2xl font-bold">{application?.company}</h1>

        <h2 className="text-lg font-medium">{application?.role}</h2>

        <div className="flex gap-4 mt-2 mb-2 text-foreground-subtle">
          {application?.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />

              <span>{application?.location}</span>
            </div>
          )}

          {application?.workLocation && (
            <div className="flex items-center gap-2">
              <House className="w-4 h-4" />

              <span>{application?.workLocation}</span>
            </div>
          )}
        </div>

        <StatusChipComponent
          status={application?.status || EApplicationStatus.WISHLIST}
        />
      </div>
    </div>
  );
};

export default ApplicationTopComponent;
