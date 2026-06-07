import { useQuerySearchParams } from "@/pkg/hook/query-search-params.hook";
import { EApplicationStatus } from "@/shared/rest-api/interface";
import { useMemo } from "react";
import { IApplicationsFilter } from "../../interface";

const EMPTY_FILTER: IApplicationsFilter = {
  status: [],
  source: [],
  employmentType: [],
  appliedFrom: "",
  appliedTo: "",
};

function parseFilter(searchParams: URLSearchParams): IApplicationsFilter {
  const status = searchParams.get("status");

  return {
    ...EMPTY_FILTER,
    status: status ? (status.split(",") as EApplicationStatus[]) : [],
  };
}

export function useApplicationsFilterService() {
  const { searchParams, changeQuery } = useQuerySearchParams();

  const appliedFilter = useMemo(
    () => parseFilter(searchParams),
    [searchParams],
  );

  const handleStatusChangeImmediate = (status: EApplicationStatus) => {
    const updated = appliedFilter.status.includes(status)
      ? appliedFilter.status.filter((s) => s !== status)
      : [...appliedFilter.status, status];

    changeQuery([
      {
        name: "status",
        value: updated.length > 0 ? updated.join(",") : undefined,
      },
      { name: "page", value: "1" },
    ]);
  };

  return {
    appliedFilter,
    filter: appliedFilter,
    handleStatusChangeImmediate,
  };
}
