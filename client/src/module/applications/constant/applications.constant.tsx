import * as m from "@/paraglide/messages";
import { Chip } from "@heroui/react";
import { ReactNode } from "react";

import { IDataTableColumn } from "@/shared/components/data-table";
import {
  EApplicationStatus,
  IApplicationDto,
} from "@/shared/rest-api/interface";

export type IApplicationsTableRow = {
  id: string;
  [key: string]: ReactNode;
};

const formatEnumLabel = (value: string) =>
  value
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase());

const formatAppliedAt = (value: string) =>
  new Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));

export const applicationStatusColorMap: Record<
  EApplicationStatus,
  "accent" | "default" | "danger" | "success" | "warning"
> = {
  [EApplicationStatus.WISHLIST]: "default",
  [EApplicationStatus.APPLIED]: "accent",
  [EApplicationStatus.HR_SCREEN]: "warning",
  [EApplicationStatus.INTERVIEW]: "warning",
  [EApplicationStatus.TECHNICAL]: "warning",
  [EApplicationStatus.TAKE_HOME]: "warning",
  [EApplicationStatus.FINAL]: "warning",
  [EApplicationStatus.OFFER]: "success",
  [EApplicationStatus.REJECTED]: "danger",
  [EApplicationStatus.WITHDRAWN]: "default",
  [EApplicationStatus.ARCHIVED]: "default",
};

export const applicationsTableColumns = (): IDataTableColumn[] => [
  {
    id: "company",
    label: m.applications_table_column_company(),
    isRowHeader: true,
  },
  {
    id: "role",
    label: m.applications_table_column_role(),
  },
  {
    id: "status",
    label: m.applications_table_column_status(),
  },
  {
    id: "source",
    label: m.applications_table_column_source(),
  },
  {
    id: "location",
    label: "Location",
  },
  {
    id: "appliedAt",
    label: m.applications_table_column_applied_at(),
  },
];

export const applicationsResource = (
  data: IApplicationDto[],
): IApplicationsTableRow[] =>
  data.map((item) => ({
    id: item.id,
    company: item.company,
    role: item.role,

    status: (
      <Chip
        color={applicationStatusColorMap[item.status]}
        size="sm"
        variant="soft"
      >
        {formatEnumLabel(item.status)}
      </Chip>
    ),
    source: item.source ? formatEnumLabel(item.source) : "—",
    location: item.location ?? "—",
    appliedAt: formatAppliedAt(item.appliedAt),
  }));

export const getApplicationsPaginationSummary = (
  page: number,
  limit: number,
  totalItems: number,
) =>
  m.applications_table_pagination_summary({
    start: String(totalItems === 0 ? 0 : (page - 1) * limit + 1),
    end: String(Math.min(page * limit, totalItems)),
    total: String(totalItems),
  });
