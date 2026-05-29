import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { EConfigKey, IConfigRequest, IConfigResponse } from "../../interface";
import { configMutationApi, configQueryApi } from "./config.api";

// options
export const configQueryOptions = {
  queryKey: [EConfigKey.CONFIG_QUERY],
  queryFn: configQueryApi,
};

// query
export const useConfigQuery = () => {
  return useQuery(configQueryOptions);
};

// update config mutation
export const useUpdateConfigMutation = () => {
  const queryClient = useQueryClient();
  const abortControllerRef = useRef<AbortController | null>(null);

  return useMutation({
    mutationKey: [EConfigKey.CONFIG_MUTATION],
    mutationFn: async (newConfig: IConfigRequest) => {
      abortControllerRef.current?.abort();

      const controller = new AbortController();
      abortControllerRef.current = controller;

      return configMutationApi(newConfig, controller.signal);
    },
    onMutate: async (newConfig: IConfigRequest) => {
      await queryClient.cancelQueries({
        queryKey: configQueryOptions.queryKey,
      });

      const previous = queryClient.getQueryData<IConfigResponse>(
        configQueryOptions.queryKey,
      );

      queryClient.setQueryData<IConfigResponse>(
        configQueryOptions.queryKey,
        (old) => ({
          success: old?.success ?? true,
          status: old?.status ?? 200,
          data: {
            ...old?.data,
            ...newConfig,
          },
        }),
      );

      return { previous };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(configQueryOptions.queryKey, data);
    },
    onError: (error, _variables, context) => {
      const isAbortError =
        (error instanceof DOMException && error.name === "AbortError") ||
        (error instanceof Error && error.name === "AbortError");

      if (isAbortError) {
        return;
      }

      if (context?.previous) {
        queryClient.setQueryData(configQueryOptions.queryKey, context.previous);
      }
    },
  });
};
