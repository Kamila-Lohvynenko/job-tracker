import { ApplicationsTableComponent } from "./element/applications-table";
import FilterComponent from "./element/filter/applications-filter.component";
import { ApplicationsHeaderComponent } from "./element/header";
import { AddApplicationModalComponent } from "./element/modals/add-application";
import { RemoveApplicationModalComponent } from "./element/modals/remove-application";

function ApplicationsModule() {
  return (
    <div className="flex h-[calc(100vh-72px)] flex-col p-4">
      <ApplicationsHeaderComponent />

      <FilterComponent />

      <ApplicationsTableComponent />

      <AddApplicationModalComponent />

      <RemoveApplicationModalComponent />
    </div>
  );
}

export default ApplicationsModule;
