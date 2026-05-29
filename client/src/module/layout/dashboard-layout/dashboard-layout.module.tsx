import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { FC, ReactNode } from "react";
import { DashboardLayoutService } from "./dashboard-layout.service";
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
      <div className="px-5 sm:px-8 py-6 sm:py-8">
        <SidebarComponent variant="static" />

        {children}
      </div>
    </HydrationBoundary>
  );
};

export default DashboardLayoutModule;
