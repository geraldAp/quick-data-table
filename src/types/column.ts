export type Column<T> = {
  header: string;
  accessor: keyof T;
  cell?: (row: T) => React.ReactNode;
  align?: "left" | "center" | "right";
  width?: string;
  thClassName?: string;
  tdClassName?: string;
};
