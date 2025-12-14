import "./App.css";
import type { Column } from "./types/column";
import { DataTable } from "./components/DataTable";

function App() {
  type User = {
    id: number;
    name: string;
    email: string;
    age: number;
    status?: "Pending" | "Active" | "Inactive";
  };

  const data: User[] = [
    { id: 1, name: "Gerald", email: "gerald@example.com", age: 28, status: "Active" },
    { id: 2, name: "Ama", email: "ama@example.com", age: 25, status: "Pending" },
    { id: 3, name: "Kojo", email: "kojo@example.com", age: 32, status: "Inactive" },
    { id: 4, name: "Esi", email: "esi@example.com", age: 22, status: "Active" },
    { id: 5, name: "Kwame", email: "kwame@example.com", age: 30, status: "Pending" },
  ];

  const statusColors: Record<string, string> = {
    Pending: "bg-yellow-100 text-yellow-800",
    Active: "bg-green-100 text-green-800",
    Inactive: "bg-gray-100 text-gray-600",
  };

  const columnsBase: Column<User>[] = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Age", accessor: "age" },
  ];

  return (
    <div className="p-8 space-y-16">
      {/* Table 1: Basic table with numbering */}
      <div>
        <h2 className="text-xl font-bold mb-2">Basic Table with Numbering</h2>
        <DataTable
          columns={columnsBase}
          data={data}
          header={<div className="text-lg font-semibold mb-2">Users</div>}
          footer={<div className="mt-2 text-sm text-gray-500">Total Users: {data.length}</div>}
          autoIncrement
          className="border rounded-lg overflow-hidden"
          tableClassName="min-w-full divide-y divide-gray-200"
          thClassName="bg-gray-100 text-left px-4 py-2"
          tdClassName="px-4 py-2"
        />
      </div>

      {/* Table 2: Table without numbering, with status badges */}
      <div>
        <h2 className="text-xl font-bold mb-2">Table with Status Badges</h2>
        <DataTable
          columns={[
            ...columnsBase,
            {
              header: "Status",
              accessor: "status",
              cell: (row) => (
                <span
                  className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${statusColors[row.status!]}`}
                >
                  {row.status}
                </span>
              ),
            },
          ]}
          data={data}
          header={<div className="text-lg font-semibold mb-2">Users Status</div>}
          className="border rounded-lg overflow-hidden"
          tableClassName="min-w-full divide-y divide-gray-200"
          thClassName="bg-gray-100 text-left px-4 py-2"
          tdClassName="px-4 py-2"
        />
      </div>

      {/* Table 3: Table with action buttons */}
      <div>
        <h2 className="text-xl font-bold mb-2">Table with Action Buttons</h2>
        <DataTable
          columns={[
            ...columnsBase,
            {
              header: "Actions",
              accessor: "id",
              cell: (row) => (
                <div className="flex gap-2" data-id={row.id}>
                  <button className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">
                    View
                  </button>
                  <button className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600">
                    Delete
                  </button>
                </div>
              ),
            },
          ]}
          data={data}
          autoIncrement
          header={<div className="text-lg font-semibold mb-2">Users Actions</div>}
          className="border rounded-lg overflow-hidden"
          tableClassName="min-w-full divide-y divide-gray-200"
          thClassName="bg-gray-100 text-left px-4 py-2"
          tdClassName="px-4 py-2"
        />
      </div>

      {/* Table 4: Simulated paginated table */}
      <div>
        <h2 className="text-xl font-bold mb-2">Paginated Table (Simulated)</h2>
        <DataTable
          columns={[
            ...columnsBase,
            {
              header: "Status",
              accessor: "status",
              cell: (row) => (
                <span
                  className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${statusColors[row.status!]}`}
                >
                  {row.status}
                </span>
              ),
            },
          ]}
          data={data.slice(0, 3)} // show only first 3 to simulate pagination
          header={<div className="text-lg font-semibold mb-2">Users Page 1</div>}
          footer={
            <div className="mt-2 flex justify-between text-sm text-gray-500">
              <span>Total Users: {data.length}</span>
              <div className="flex gap-1">
                <button className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">Prev</button>
                <button className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">Next</button>
              </div>
            </div>
          }
          autoIncrement
          className="border rounded-lg overflow-hidden"
          tableClassName="min-w-full divide-y divide-gray-200"
          thClassName="bg-gray-100 text-left px-4 py-2"
          tdClassName="px-4 py-2"
        />
      </div>
    </div>
  );
}

export default App;
