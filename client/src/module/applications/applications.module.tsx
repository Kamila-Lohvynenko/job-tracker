import { ApplicationsTableComponent } from "./element/applications-table";
import FilterComponent from "./element/filter/applications-filter.component";
import { ApplicationsHeaderComponent } from "./element/header";
import { AddApplicationModalComponent } from "./element/modals/add-application";

function ApplicationsModule() {
  return (
    <div className="p-4">
      <ApplicationsHeaderComponent />

      <FilterComponent />

      <ApplicationsTableComponent />

      <AddApplicationModalComponent />
    </div>
  );
}

export default ApplicationsModule;
