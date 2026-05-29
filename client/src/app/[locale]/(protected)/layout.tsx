import { DashboardLayoutModule } from "@/module/layout/dashboard-layout";
import type { FC, ReactNode } from "react";

// interface
interface IDashboardLayoutModuleProps {
  children: ReactNode;
}

// component
const DashboardLayout: FC<Readonly<IDashboardLayoutModuleProps>> = (props) => {
  const { children } = props;

  // return
  return <DashboardLayoutModule>{children}</DashboardLayoutModule>;
};

export default DashboardLayout;
