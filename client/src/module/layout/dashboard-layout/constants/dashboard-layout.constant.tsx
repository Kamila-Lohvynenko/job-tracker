import { ERoutes } from "@/shared/routes";
import { Calendar, ChartBar, FileUser, HomeIcon } from "lucide-react";

// sidebar items
export const DASHBOARD_SIDEBAR_ITEMS = [
  {
    label: "Dashboard",
    href: ERoutes.DASHBOARD,
    icon: <HomeIcon />,
  },
  {
    label: "Applications",
    href: ERoutes.APPLICATIONS,
    icon: <FileUser />,
  },
  {
    label: "Calendar",
    href: ERoutes.CALENDAR,
    icon: <Calendar />,
  },
  {
    label: "Analytics",
    href: ERoutes.ANALYTICS,
    icon: <ChartBar />,
  },
];
