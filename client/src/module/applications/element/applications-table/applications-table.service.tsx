"use client";

import { useApplicationsStore } from "@/module/applications/applications.store";
import { useQuerySearchParams } from "@/pkg/hook";
import { useGetApplicationsQuery } from "@/shared/rest-api/api/applications";

export function useApplicationsTableService() {
  const { searchParams, changeQuery } = useQuerySearchParams();
  const handleApplicationsStore = useApplicationsStore(
    (state) => state.handleApplicationsStore,
  );

  const { data, isFetching, isPending, error } = useGetApplicationsQuery();

  const page = data?.data?.page ?? (Number(searchParams.get("page")) || 1);
  const limit = data?.data?.limit ?? (Number(searchParams.get("limit")) || 20);
  const totalPages = data?.data?.totalPages ?? 1;
  const totalItems = data?.data?.totalItems ?? 0;

  const setPage = (newPage: number) => {
    changeQuery([
      {
        name: "page",
        value: newPage <= 1 ? undefined : String(newPage),
      },
    ]);
  };

  const onDeleteApplication = (id: string) => {
    handleApplicationsStore({ modalType: "remove", applicationIdToDelete: id });
  };

  return {
    applicationsData: data?.data?.items ?? [],
    error,
    isFetching,
    isPending,
    limit,
    onDeleteApplication,
    page,
    setPage,
    totalItems,
    totalPages,
  };
}
