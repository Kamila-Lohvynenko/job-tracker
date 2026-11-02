"use client";

import { useState } from "react";
import { useApplicationService } from "./application.service";
import { APPLICATION_TABS } from "./constant";
import { ApplicationHeaderComponent } from "./element/header";
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
    </div>
  );
}

export default ApplicationModule;
