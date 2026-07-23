import * as m from "@/paraglide/messages";
import { ReactNode } from "react";

import { IDataTableColumn } from "@/shared/components/data-table";
import { StatusChipComponent } from "@/shared/components/status-chip";

import { CompanyItemComponent } from "@/shared/components/item/company";
import { SourceItemComponent } from "@/shared/components/item/source";
import {
  EEmploymentType,
  EWorkLocation,
  IApplicationDto,
} from "@/shared/rest-api/interface";

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
    company: <CompanyItemComponent company={item.company} showName={true} />,
    role: item.role,

    status: <StatusChipComponent status={item.status} />,
    source: item.source ? (
      <SourceItemComponent source={item.source} showName={true} />
    ) : (
      "—"
    ),
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

export const employmentTypeLabelMap: Record<EEmploymentType, () => string> = {
  [EEmploymentType.FULL_TIME]: m.employment_type_label_FULL_TIME,
  [EEmploymentType.PART_TIME]: m.employment_type_label_PART_TIME,
  [EEmploymentType.CONTRACT]: m.employment_type_label_CONTRACT,
  [EEmploymentType.INTERNSHIP]: m.employment_type_label_INTERNSHIP,
  [EEmploymentType.FREELANCE]: m.employment_type_label_FREELANCE,
  [EEmploymentType.TEMPORARY]: m.employment_type_label_TEMPORARY,
};

export const workLocationLabelMap: Record<EWorkLocation, () => string> = {
  [EWorkLocation.REMOTE]: m.work_location_label_REMOTE,
  [EWorkLocation.HYBRID]: m.work_location_label_HYBRID,
  [EWorkLocation.ON_SITE]: m.work_location_label_ON_SITE,
  [EWorkLocation.FLEXIBLE]: m.work_location_label_FLEXIBLE,
  [EWorkLocation.OTHER]: m.work_location_label_OTHER,
};
