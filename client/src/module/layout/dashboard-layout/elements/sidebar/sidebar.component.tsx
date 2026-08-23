"use client";

import { LogoComponent } from "@/shared/components/logo";
import { cn } from "@/shared/utils/cn";
import { Button, Card, Drawer } from "@heroui/react";
import { LazyMotion, domAnimation } from "framer-motion";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { FC } from "react";
import { DASHBOARD_SIDEBAR_ITEMS } from "../../constants/dashboard-layout.constant";
import { SidebarItemComponent } from "./element/sidebar-item";
import { UserButtonComponent } from "./element/user-button";
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
            "rounded-none bg-background-soft flex flex-col justify-between",
            isCollapsed ? "w-18" : "w-64",
          )}
        >
          <div>
            <div className="flex gap-2 justify-between">
              <LogoComponent isCollapsed={isCollapsed} className="mb-4" />

              <Button
                onClick={thisService.toggleSidebar}
                isIconOnly
                aria-label="Toggle Sidebar"
                className={cn(
                  "rounded-none bg-transparent text-foreground-subtle hover:text-foreground ",
                  isCollapsed ? "cursor-e-resize" : "cursor-w-resize",
                )}
              >
                {isCollapsed ? (
                  <ArrowRightFromLine className="w-4 h-4" />
                ) : (
                  <ArrowLeftFromLine className="w-4 h-4" />
                )}
              </Button>
            </div>

            {DASHBOARD_SIDEBAR_ITEMS.map((item) => (
              <SidebarItemComponent
                key={item.href}
                item={item}
                isCollapsed={isCollapsed}
              />
            ))}
          </div>

          <UserButtonComponent />
        </Card>
      </>
    );
  };

  return (
    <div className={cn("flex gap-4 h-screen", className)}>
      <LazyMotion features={domAnimation}>
        {variant === "static" ? (
          <>{sideBarContent()}</>
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
