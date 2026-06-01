import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { FC, ReactNode } from "react";
import { DashboardLayoutService } from "./dashboard-layout.service";
import { HeaderComponent } from "./elements/header";
import { SidebarComponent } from "./elements/sidebar";

// interface
interface IDashboardLayoutModuleProps {
  children: ReactNode;
}

const DashboardLayoutModule: FC<Readonly<IDashboardLayoutModuleProps>> = async (
  props,
) => {
  const { children } = props;
  const thisService = await DashboardLayoutService();

  // return
  return (
    <HydrationBoundary state={dehydrate(thisService.queryClient)}>
      <div className="relative h-dvh w-full bg-surface">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 w-full h-full">
          <SidebarComponent
            variant="static"
            className="hidden md:flex gap-0!"
          />

          <div>
            <HeaderComponent />

            {children}
          </div>
        </div>

        <SidebarComponent variant="drawer" />
      </div>
    </HydrationBoundary>
  );
};

export default DashboardLayoutModule;
