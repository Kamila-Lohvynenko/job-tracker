import { ApplicationsTableComponent } from "./element/applications-table";
import FilterComponent from "./element/filter/applications-filter.component";

function ApplicationsModule() {
  return (
    <div>
      <FilterComponent />

      <ApplicationsTableComponent />
    </div>
  );
}

export default ApplicationsModule;
