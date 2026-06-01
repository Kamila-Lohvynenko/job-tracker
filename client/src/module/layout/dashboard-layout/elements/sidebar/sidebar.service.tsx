"use client";

import {
  configQueryOptions,
  useConfigQuery,
  useUpdateConfigMutation,
} from "@/shared/rest-api/api/config/config.hook";
import { IConfigResponse } from "@/shared/rest-api/interface";
import { useGlobalStore } from "@/shared/store/global.store";
import { useQueryClient } from "@tanstack/react-query";

// service
export const useSidebarService = () => {
  const menu = useGlobalStore((state) => state.menu);
  const handleGlobalStore = useGlobalStore((state) => state.handleGlobalStore);

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

  const toggleMenu = () => {
    handleGlobalStore({ menu: !menu });
  };

  return {
    config: data?.data,
    toggleSidebar,
    menu,
    toggleMenu,
  };
};
