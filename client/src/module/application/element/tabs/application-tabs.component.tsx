"use client";

import { useState } from "react";

import { Tabs } from "@heroui/react";
import { APPLICATION_TABS } from "../../constant";
import { ApplicationOverviewTabComponent } from "./element/overview";
import { ApplicationTimelineTabComponent } from "./element/timeline";

const ApplicationTabsComponent = () => {
  const [activeTab, setActiveTab] = useState<string>(APPLICATION_TABS[0].id);

  return (
    <Tabs
      className="w-full max-w-md mt-4"
      variant="secondary"
      selectedKey={activeTab}
      onSelectionChange={(key) => setActiveTab(key as string)}
    >
      <Tabs.ListContainer>
        <Tabs.List aria-label="Options">
          {APPLICATION_TABS.map((tab) => (
            <Tabs.Tab key={tab.id} id={tab.id}>
              {tab.label}
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
