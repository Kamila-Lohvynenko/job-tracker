"use client";

import { useApplicationService } from "./application.service";
import { ApplicationHeaderComponent } from "./element/header";
import { ApplicationEventModalComponent } from "./element/modals/application-event";
import { RemoveApplicationEventModalComponent } from "./element/modals/remove-application-event";
import { ApplicationTabsComponent } from "./element/tabs";
import { ApplicationTopComponent } from "./element/top";

// module
function ApplicationModule() {
  const { applicationId } = useApplicationService();

  // return
  return (
    <div className="p-4">
      <ApplicationHeaderComponent />

      <ApplicationTopComponent applicationId={applicationId} />

      <ApplicationTabsComponent />

      <ApplicationEventModalComponent />

      <RemoveApplicationEventModalComponent />
    </div>
  );
}

export default ApplicationModule;
