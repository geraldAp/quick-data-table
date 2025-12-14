import React from "react";
import type { Column } from "../types/column";
import { cn } from "../utils/className";

export type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];

  header?: React.ReactNode;
  footer?: React.ReactNode;
  pagination?: React.ReactNode;

  isLoading?: boolean;
  loadingRows?: number;
  loadingState?: React.ReactNode;
  emptyState?: React.ReactNode;

  autoIncrement?: boolean;
  getRowId?: (row: T, index: number) => string | number;

  className?: string;
  tableClassName?: string;
  theadClassName?: string;
  tbodyClassName?: string;
  trClassName?: string;
  thClassName?: string;
  tdClassName?: string;
};

export function DataTable<T>({
  data,
  columns,
  header,
  footer,
  pagination,
  isLoading = false,
  loadingRows = 3,
  loadingState,
  emptyState = <div className="px-4 py-4 text-center text-sm text-gray-500">No records found.</div>,
  autoIncrement = false,
  getRowId,
  className,
  tableClassName,
  theadClassName,
  tbodyClassName,
  trClassName,
  thClassName,
  tdClassName,
}: DataTableProps<T>) {
  const totalColumns = columns.length + (autoIncrement ? 1 : 0);

  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      {header}

      <table
        className={cn(
          "min-w-full border border-gray-200 divide-y divide-gray-200 text-left text-sm",
          tableClassName
        )}
      >
        <thead className={cn("bg-gray-50", theadClassName)}>
          <tr className={trClassName}>
            {autoIncrement && <th className={cn("px-4 py-2 text-left font-medium text-gray-700", thClassName)}>#</th>}
            {columns.map((col) => (
              <th
                key={String(col.accessor)}
                style={{ width: col.width }}
                className={cn("px-4 py-2 font-medium text-gray-700", thClassName, col.thClassName)}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className={cn("bg-white divide-y divide-gray-200", tbodyClassName)}>
          {isLoading
            ? loadingState
              ? (
                <tr>
                  <td colSpan={totalColumns}>{loadingState}</td>
                </tr>
              )
              : Array.from({ length: loadingRows }).map((_, i) => (
                <tr key={i}>
                  {autoIncrement && <td className={cn("px-4 py-2 text-gray-600", tdClassName)}>—</td>}
                  {columns.map((_col,i) => (
                    <td key={i} className={cn("px-4 py-2 text-gray-600", tdClassName)}>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                    </td>
                  ))}
                </tr>
              ))
            : data.length > 0
              ? data.map((row, i) => (
                <tr key={getRowId ? getRowId(row, i) : i} className={trClassName}>
                  {autoIncrement && <td className={cn("px-4 py-2 text-gray-600", tdClassName)}>{i + 1}</td>}
                  {columns.map((col) => (
                    <td key={String(col.accessor)} className={cn("px-4 py-2 text-gray-600", tdClassName, col.tdClassName)}>
                      {col.cell ? col.cell(row) : String(row[col.accessor] ?? "N/A")}
                    </td>
                  ))}
                </tr>
              ))
              : (
                <tr>
                  <td colSpan={totalColumns}>{emptyState}</td>
                </tr>
              )}
        </tbody>

        {footer && (
          <tfoot>
            <tr>
              <td colSpan={totalColumns} className="px-4 py-2">
                {footer}
              </td>
            </tr>
          </tfoot>
        )}
      </table>

      {pagination}
    </div>
  );
}
