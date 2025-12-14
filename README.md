# Quick Data Table

is an open source lightweight, fully customizable React table component designed to accelerate building data-driven UIs. It is built with Tailwind CSS by default but supports overriding styles with native CSS classes, giving you both speed and flexibility.

Key Features:

- Render dynamic tables with ease using a simple column definition.
- Optional auto-increment (numbering) column.
- Customizable header, footer, and pagination slots.
- Fully responsive and scrollable for large tables.
- Loading state with skeleton rows or custom loading component.
- Supports empty state with a custom React node.
- Each column can have a custom cell renderer.
- Clean and minimal Tailwind default styling with the ability to override classes.

## Install

```bash
npm install quick-data-table
```

Peer dependencies required in your app:

```bash
npm install react react-dom tailwindcss
```

Add Tailwind to your global CSS:

```css
@import "tailwindcss";
```

## Usage

```tsx
import { DataTable } from "quick-data-table";

type User = {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive";
};

const data: User[] = [
  { id: 1, name: "Gerald", email: "gerald@example.com", status: "active" },
  { id: 2, name: "Ama", email: "ama@example.com", status: "inactive" },
];

const columns = [
  { header: "ID", accessor: "id" },
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  {
    header: "Status",
    accessor: "status",
    cell: (row) => (
      <span className={
        row.status === "active"
          ? "inline-flex items-center gap-1 rounded bg-green-100 px-2 py-1 text-xs text-green-700"
          : "inline-flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-xs text-gray-700"
      }>
        {row.status}
      </span>
    ),
  },
  {
    header: "Actions",
    accessor: "id",
    cell: (row) => (
      <div className="flex gap-2">
        <button className="px-2 py-1 rounded bg-blue-600 text-white">Edit</button>
        <button className="px-2 py-1 rounded bg-red-600 text-white">Delete</button>
      </div>
    ),
  },
];

<DataTable columns={columns} data={data} autoIncrement />
```

### Footer and Pagination

```tsx
<DataTable
  columns={columns}
  data={data}
  footer={<div>Total Users: {data.length}</div>}
  pagination={<div className="flex items-center gap-2"><button>Prev</button><span>1</span><button>Next</button></div>}
/>
```

## Types

```ts
import type { Column } from "quick-data-table";
import type { DataTableProps } from "quick-data-table";
```

## Loading

```tsx
<DataTable
  columns={columns}
  data={[]}
  isLoading
  loadingRows={5}
/>
```

```tsx
<DataTable
  columns={columns}
  data={[]}
  isLoading
  loadingState={
    <div className="flex items-center justify-center py-8">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-transparent"></div>
      <span className="ml-2 text-sm text-gray-600">Loading...</span>
    </div>
  }
/>
```

## Props

- `data` (required): array of rows
- `columns` (required): array of column definitions
- `header`: node rendered above the table
- `footer`: node rendered inside `<tfoot>`
- `pagination`: node rendered below the table
- `isLoading` (default `false`): toggles loading state
- `loadingRows` (default `3`): number of skeleton rows when loading
- `loadingState`: custom loading node spanning all columns
- `emptyState` (default "No records found."): node shown when `data` is empty
- `autoIncrement` (default `false`): show row index column as first column
- `getRowId`: `(row, index) => string | number` for stable keys
- `className`: wrapper `<div>` class
- `tableClassName`: `<table>` class
- `theadClassName`: `<thead>` class
- `tbodyClassName`: `<tbody>` class
- `trClassName`: row `<tr>` class
- `thClassName`: header cell `<th>` class
- `tdClassName`: body cell `<td>` class

## License

Open source under the MIT License. See `LICENSE` for details.
