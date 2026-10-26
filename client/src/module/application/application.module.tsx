"use client";

import { useApplicationService } from "./application.service";
import { ApplicationHeaderComponent } from "./element/header";
import { ApplicationTopComponent } from "./element/top";

// module
function ApplicationModule() {
  const { applicationId, application, isFetched, isFetching, handleRefresh } =
    useApplicationService();

  // return
  return (
    <div className="p-4">
      <ApplicationHeaderComponent />

      <ApplicationTopComponent applicationId={applicationId} />

      <div>Application id: {applicationId}</div>
      <div>Application: {application?.company}</div>
      <div>Is fetched: {isFetched ? "Yes" : "No"}</div>
      <div>Is fetching: {isFetching ? "Yes" : "No"}</div>
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
}

export default ApplicationModule;
