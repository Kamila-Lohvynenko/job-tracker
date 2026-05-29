"use client";

import {
  configQueryOptions,
  useConfigQuery,
  useUpdateConfigMutation,
} from "@/shared/rest-api/api/config/config.hook";
import { IConfigResponse } from "@/shared/rest-api/interface";
import { useQueryClient } from "@tanstack/react-query";

// service
export const useSidebarService = () => {
  const queryClient = useQueryClient();
  const { data } = useConfigQuery();
  const { mutate } = useUpdateConfigMutation();

  const toggleSidebar = () => {
    const current = queryClient.getQueryData<IConfigResponse>(
      configQueryOptions.queryKey,
    );

    mutate({
      isSidebarOpen: !(current?.data?.isSidebarOpen ?? true),
    });
  };

  return {
    config: data?.data,
    toggleSidebar,
  };
};
