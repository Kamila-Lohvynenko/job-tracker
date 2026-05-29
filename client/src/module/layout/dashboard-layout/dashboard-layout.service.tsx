import { getQueryClient } from "@/pkg/library/rest-api/service";
import { EConfigKey } from "@/shared/rest-api/interface";
import { cookies } from "next/headers";

// service
export const DashboardLayoutService = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [EConfigKey.CONFIG_QUERY],
    queryFn: async () => {
      const cookieStore = await cookies();
      const raw = cookieStore.get("settings")?.value;
      let settings = { isSidebarOpen: true };

      try {
        settings = raw ? JSON.parse(raw) : settings;
      } catch {
        // keep defaults
      }

      return {
        success: true,
        status: 200,
        data: settings,
      };
    },
  });

  return {
    queryClient,
  };
};
