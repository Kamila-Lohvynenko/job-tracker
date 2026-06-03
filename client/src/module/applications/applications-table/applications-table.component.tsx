"use client";

import * as m from "@/paraglide/messages";
import { Alert } from "@heroui/react";

import {
  applicationsResource,
  applicationsTableColumns,
  getApplicationsPaginationSummary,
} from "@/module/applications/constant";
import { DataTableComponent } from "@/shared/components/data-table";

import { useApplicationsTableService } from "./applications-table.service";

export function ApplicationsTableComponent() {
  const thisService = useApplicationsTableService();

  console.log(thisService.applicationsData);

  if (thisService.error) {
    return (
      <Alert status="danger" className="bg-danger-soft text-danger rounded-sm">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>{m.common_error_title()}</Alert.Title>
          <Alert.Description>{m.common_error_description()}</Alert.Description>
        </Alert.Content>
      </Alert>
    );
  }

  return (
    <DataTableComponent
      ariaLabel={m.applications_table_aria_label()}
      columns={applicationsTableColumns()}
      emptyMessage={m.label_table_empty()}
      isLoading={thisService.isFetching}
      items={applicationsResource(thisService.applicationsData)}
      pagination={{
        limit: thisService.limit,
        onPageChange: thisService.setPage,
        page: thisService.page,
        summary: getApplicationsPaginationSummary(
          thisService.page,
          thisService.limit,
          thisService.totalItems,
        ),
        totalItems: thisService.totalItems,
        totalPages: thisService.totalPages,
      }}
    />
  );
}
