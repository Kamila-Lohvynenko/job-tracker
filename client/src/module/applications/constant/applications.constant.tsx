import * as m from "@/paraglide/messages";
import { ReactNode } from "react";

import { IDataTableColumn } from "@/shared/components/data-table";
import { StatusChipComponent } from "@/shared/components/status-chip";

import { ActionComponent } from "@/shared/components/action";
import { CompanyItemComponent } from "@/shared/components/item/company";
import { SourceItemComponent } from "@/shared/components/item/source";
import { IApplicationDto } from "@/shared/rest-api/interface";

export type IApplicationsTableRow = {
  id: string;
  [key: string]: ReactNode;
};

const formatAppliedAt = (value: string) =>
  new Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));

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
    id: "appliedAt",
    label: m.applications_table_column_applied_at(),
  },
  {
    id: "action",
    label: m.applications_table_column_action(),
  },
];

export const applicationsResource = (
  data: IApplicationDto[],
  onDelete: (id: string) => void,
): IApplicationsTableRow[] =>
  data.map((item) => ({
    id: item.id,
    company: <CompanyItemComponent company={item.company} showName={true} />,
    role: item.role,

    status: <StatusChipComponent status={item.status} />,
    source: item.source ? (
      <SourceItemComponent source={item.source} showName={true} />
    ) : (
      "—"
    ),
    appliedAt: formatAppliedAt(item.appliedAt),
    action: (
      <ActionComponent
        hrefView={`/applications/${item.id}`}
        onDelete={() => onDelete(item.id)}
      />
    ),
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
