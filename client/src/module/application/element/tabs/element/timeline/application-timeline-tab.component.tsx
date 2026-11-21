"use client";

import * as m from "@/paraglide/messages";
import { Tabs } from "@heroui/react";
import { ApplicationTimelineTabService } from "./application-timeline-tab.service";
import { ApplicationEventsListCardComponent } from "./element/list-card";

const ApplicationTimelineTabComponent = () => {
  const { applicationEvents, isLoading } = ApplicationTimelineTabService();

  console.log({ applicationEvents });

  if (isLoading) return <div>{m.application_timeline_loading()}</div>;

  return (
    <Tabs.Panel className="pt-4" id="timeline">
      {applicationEvents?.items.length === 0 ? (
        <div>{m.application_timeline_empty()}</div>
      ) : (
        <ul className="flex flex-col">
          {applicationEvents?.items.map((event, index, items) => (
            <ApplicationEventsListCardComponent
              key={event.id}
              applicationEvent={event}
              isFirst={index === 0}
              isLast={index === items.length - 1}
            />
          ))}
        </ul>
      )}
    </Tabs.Panel>
  );
};

export default ApplicationTimelineTabComponent;
