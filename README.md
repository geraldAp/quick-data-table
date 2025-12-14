# quick-data-table

Publishable React table component with full TypeScript support and Tailwind styling.

## Install

```
npm install quick-data-table
```

Peer dependencies required in your app:

```
npm install react react-dom tailwindcss
```

Add Tailwind to your global CSS:

```
@import "tailwindcss";
```

## Usage

```
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

```
<DataTable
  columns={columns}
  data={data}
  footer={<div>Total Users: {data.length}</div>}
  pagination={<div className="flex items-center gap-2"><button>Prev</button><span>1</span><button>Next</button></div>}
/>
```

## Types

```
import type { Column } from "quick-data-table";
import type { DataTableProps } from "quick-data-table";
```

## Loading

```
<DataTable
  columns={columns}
  data={[]}
  isLoading
  loadingRows={5}
/>
```

```
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

- `data`: array of rows
- `columns`: array of column definitions
- `header`: node rendered above the table
- `footer`: node rendered inside `<tfoot>`
- `pagination`: node rendered below the table
- `isLoading`: boolean
- `loadingRows`: number of skeleton rows to display when loading (default `3`)
- `loadingState`: custom node to render spanning all columns when loading
- `emptyState`: node shown when `data` is empty
- `autoIncrement`: show row index column
- `getRowId`: custom row key
- `className` and `*ClassName` props to style sections
