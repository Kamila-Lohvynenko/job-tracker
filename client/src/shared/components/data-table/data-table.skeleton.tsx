import { Skeleton } from "@heroui/react";
import { ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

import { IDataTableColumn } from "./data-table.component";

export type IDataTableSkeletonRow = {
  id: string;
  [key: string]: ReactNode;
};

export const getDataTableSkeletonItems = (
  columns: IDataTableColumn[],
  rows = 10,
): IDataTableSkeletonRow[] =>
  Array.from({ length: rows }, (_, index) => {
    const row: IDataTableSkeletonRow = { id: `skeleton-${index}` };

    for (const column of columns) {
      row[column.id] = (
        <Skeleton className={cn("h-4 rounded-lg", column.isRowHeader ? "w-36" : "w-full")} />
      );
    }

    return row;
  });
