"use client";

import { LogoComponent } from "@/shared/components/logo";
import { Button, Card } from "@heroui/react";
import { FC } from "react";
import { useSidebarService } from "./sidebar.service";

// interfaces
interface ISidebarComponentProps {
  variant: "static" | "drawer";
}

// component
export const SidebarComponent: FC<ISidebarComponentProps> = () => {
  const thisService = useSidebarService();
  const { config } = thisService;

  const sideBarContent = () => {
    return (
      <Card>
        <LogoComponent />
        {config?.isSidebarOpen ? <p>open</p> : <p>closed</p>}
        <Button onClick={thisService.toggleSidebar}>Toggle Sidebar</Button>
      </Card>
    );
  };

  return <div>{sideBarContent()}</div>;
};
