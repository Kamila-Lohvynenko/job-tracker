"use client";

import { LogoComponent } from "@/shared/components/logo";
import { cn } from "@/shared/utils/cn";
import { Button, Card, Drawer } from "@heroui/react";
import { LazyMotion, domAnimation } from "framer-motion";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import { FC } from "react";
import { DASHBOARD_SIDEBAR_ITEMS } from "../../constants/dashboard-layout.constant";
import { SidebarItemComponent } from "./element/sidebar-item";
import { useSidebarService } from "./sidebar.service";

// interfaces
interface ISidebarComponentProps {
  variant: "static" | "drawer";
  className?: string;
}

// component
export const SidebarComponent: FC<ISidebarComponentProps> = (props) => {
  const { variant, className } = props;

  const thisService = useSidebarService();
  const { config } = thisService;

  const sideBarContent = () => {
    const isCollapsed = !config?.isSidebarOpen && variant === "static";

    return (
      <>
        <Card
          className={cn(
            "rounded-none bg-background-soft ",
            isCollapsed ? "w-18" : "w-64",
          )}
        >
          <LogoComponent isCollapsed={isCollapsed} />

          {DASHBOARD_SIDEBAR_ITEMS.map((item) => (
            <SidebarItemComponent
              key={item.href}
              item={item}
              isCollapsed={isCollapsed}
            />
          ))}
        </Card>
      </>
    );
  };

  return (
    <div className={cn("flex gap-4 h-full", className)}>
      <LazyMotion features={domAnimation}>
        {variant === "static" ? (
          <>
            {sideBarContent()}

            <Button
              onClick={thisService.toggleSidebar}
              isIconOnly
              aria-label="Toggle Sidebar"
              className="rounded-none bg-transparent text-foreground-subtle hover:text-foreground"
            >
              {config?.isSidebarOpen ? (
                <PanelRightClose className="w-6 h-6" />
              ) : (
                <PanelRightOpen className="w-6 h-6" />
              )}
            </Button>
          </>
        ) : (
          <Drawer
            isOpen={thisService.menu}
            onOpenChange={thisService.toggleMenu}
          >
            <Drawer.Backdrop>
              <Drawer.Content placement="left">
                {sideBarContent()}
              </Drawer.Content>
            </Drawer.Backdrop>
          </Drawer>
        )}
      </LazyMotion>
    </div>
  );
};
