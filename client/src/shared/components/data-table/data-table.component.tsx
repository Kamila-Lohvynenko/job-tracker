"use client";

import { EmptyState, Pagination, Spinner, Table } from "@heroui/react";
import { Inbox } from "lucide-react";
import { ReactNode, useMemo } from "react";

import { cn } from "@/shared/utils/cn";

import { getDataTableSkeletonItems } from "./data-table.skeleton";

// interface
export interface IDataTableColumn {
  id: string;
  label?: string;
  isRowHeader?: boolean;
}

export interface IDataTablePagination {
  page: number;
  totalPages: number;
  totalItems: number;
  limit: number;
  onPageChange: (page: number) => void;
  summary?: string;
}

interface IDataTableProps<T extends { id: string }> {
  ariaLabel: string;
  columns: IDataTableColumn[];
  items: T[];
  isPending?: boolean;
  isFetching?: boolean;
  emptyMessage: string;
  pagination?: IDataTablePagination;
  renderCell?: (item: T, columnId: string) => ReactNode;
  onRowClick?: (item: T) => void;
  className?: string;
}

export function DataTableComponent<T extends { id: string }>(
  props: Readonly<IDataTableProps<T>>,
) {
  const {
    ariaLabel,
    columns,
    items,
    isPending = false,
    isFetching = false,
    emptyMessage,
    pagination,
    renderCell,
    onRowClick,
    className,
  } = props;

  const tableItems = useMemo(
    (): T[] =>
      isPending ? (getDataTableSkeletonItems(columns) as T[]) : items,
    [columns, isPending, items],
  );

  const pages = pagination
    ? Array.from({ length: pagination.totalPages }, (_, index) => index + 1)
    : [];

  return (
    <div
      className={cn(
        "relative flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto",
        className,
      )}
    >
      {isFetching && !isPending && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-large bg-background/60">
          <Spinner size="lg" />
        </div>
      )}

      <Table
        className={cn(
          isFetching && !isPending && "pointer-events-none opacity-60",
        )}
      >
        <Table.ScrollContainer>
          <Table.Content aria-label={ariaLabel} className="min-w-180">
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column id={column.id} isRowHeader={column.isRowHeader}>
                  {column.label}
                </Table.Column>
              )}
            </Table.Header>

            <Table.Body
              items={tableItems}
              renderEmptyState={() => (
                <EmptyState className="flex h-full w-full flex-col items-center justify-center gap-3 py-10 text-center">
                  <Inbox aria-hidden className="size-6 text-muted" />
                  <span className="text-sm text-muted">{emptyMessage}</span>
                </EmptyState>
              )}
            >
              {(item) => (
                <Table.Row
                  className={cn(
                    !isPending &&
                      onRowClick &&
                      "cursor-pointer transition-colors hover:bg-default-100",
                  )}
                  onClick={() => !isPending && onRowClick?.(item)}
                >
                  <Table.Collection items={columns}>
                    {(column) => (
                      <Table.Cell className="text-small">
                        {renderCell
                          ? renderCell(item, column.id)
                          : (item as Record<string, ReactNode>)[column.id]}
                      </Table.Cell>
                    )}
                  </Table.Collection>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>

        {!isPending && pagination && pagination.totalPages > 0 && (
          <Table.Footer>
            <Pagination size="sm">
              {pagination.summary && (
                <Pagination.Summary>{pagination.summary}</Pagination.Summary>
              )}

              <Pagination.Content>
                <Pagination.Item>
                  <Pagination.Previous
                    isDisabled={
                      isFetching ||
                      pagination.page <= 1 ||
                      pagination.totalPages <= 1
                    }
                    onPress={() =>
                      pagination.onPageChange(Math.max(1, pagination.page - 1))
                    }
                  >
                    <Pagination.PreviousIcon />
                  </Pagination.Previous>
                </Pagination.Item>

                {pages.map((pageNumber) => (
                  <Pagination.Item key={pageNumber}>
                    <Pagination.Link
                      isActive={pageNumber === pagination.page}
                      isDisabled={isFetching || pagination.totalPages <= 1}
                      onPress={() => pagination.onPageChange(pageNumber)}
                    >
                      {pageNumber}
                    </Pagination.Link>
                  </Pagination.Item>
                ))}

                <Pagination.Item>
                  <Pagination.Next
                    isDisabled={
                      isFetching ||
                      pagination.page >= pagination.totalPages ||
                      pagination.totalPages <= 1
                    }
                    onPress={() =>
                      pagination.onPageChange(
                        Math.min(pagination.totalPages, pagination.page + 1),
                      )
                    }
                  >
                    <Pagination.NextIcon />
                  </Pagination.Next>
                </Pagination.Item>
              </Pagination.Content>
            </Pagination>
          </Table.Footer>
        )}
      </Table>
    </div>
  );
}
