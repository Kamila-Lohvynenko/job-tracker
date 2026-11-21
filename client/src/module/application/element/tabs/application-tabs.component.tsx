"use client";

import * as m from "@/paraglide/messages";
import { useState } from "react";

import { Tabs } from "@heroui/react";
import { APPLICATION_TABS } from "../../constant";
import { ApplicationOverviewTabComponent } from "./element/overview";
import { ApplicationTimelineTabComponent } from "./element/timeline";

const ApplicationTabsComponent = () => {
  const [activeTab, setActiveTab] = useState<string>(APPLICATION_TABS[0].id);

  return (
    <Tabs
      className="mt-4 w-full"
      variant="secondary"
      selectedKey={activeTab}
      onSelectionChange={(key) => setActiveTab(key as string)}
    >
      <Tabs.ListContainer className="w-full">
        <Tabs.List aria-label={m.application_tabs_aria_label()} className="w-full">
          {APPLICATION_TABS.map((tab) => (
            <Tabs.Tab key={tab.id} id={tab.id} className="flex-1">
              {tab.label()}
              <Tabs.Indicator className="bg-primary" />
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs.ListContainer>

      <ApplicationOverviewTabComponent />

      <ApplicationTimelineTabComponent />
    </Tabs>
  );
};

export default ApplicationTabsComponent;
