"use client";

import { useQuerySearchParams } from "@/pkg/hook";
import { useGetApplicationsQuery } from "@/shared/rest-api/api/applications";

export function useApplicationsTableService() {
  const { searchParams, changeQuery } = useQuerySearchParams();

  const { data, isFetching, error } = useGetApplicationsQuery();

  const page = data?.data.page ?? (Number(searchParams.get("page")) || 1);
  const limit = data?.data.limit ?? (Number(searchParams.get("limit")) || 10);
  const totalPages = data?.data.totalPages ?? 1;
  const totalItems = data?.data.totalItems ?? 0;

  const setPage = (newPage: number) => {
    changeQuery([
      {
        name: "page",
        value: newPage <= 1 ? undefined : String(newPage),
      },
    ]);
  };

  return {
    applicationsData: data?.data.items ?? [],
    error,
    isFetching,
    limit,
    page,
    setPage,
    totalItems,
    totalPages,
  };
}
