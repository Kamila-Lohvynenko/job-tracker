"use client";

import { Tabs } from "@heroui/react";
import { ApplicationTimelineTabService } from "./application-timeline-tab.service";
import { ApplicationEventsListCardComponent } from "./element/list-card";

const ApplicationTimelineTabComponent = () => {
  const { applicationEvents, isLoading } = ApplicationTimelineTabService();

  console.log({ applicationEvents });

  if (isLoading) return <div>Loading...</div>;

  return (
    <Tabs.Panel className="pt-4" id="timeline">
      {applicationEvents?.items.length === 0 ? (
        <div>No application events found</div>
      ) : (
        <ul>
          {applicationEvents?.items.map((event) => (
            <ApplicationEventsListCardComponent
              key={event.id}
              applicationEvent={event}
            />
          ))}
        </ul>
      )}
    </Tabs.Panel>
  );
};

export default ApplicationTimelineTabComponent;
