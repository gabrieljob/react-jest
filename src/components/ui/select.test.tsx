import { ColumnDef, useReactTable } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { render, screen } from "@testing-library/react";
import tasks from "../data/tasks";
import { columns } from "../data/columns";
import userEvent from "@testing-library/user-event";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function Component<TData, TValue>({
  data,
  columns,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: [],
      columnVisibility: {},
      rowSelection: {},
      columnFilters: [],
    },
    enableRowSelection: true,
    onRowSelectionChange: () => jest.fn(),
    onSortingChange: () => jest.fn(),
    onColumnFiltersChange: () => jest.fn(),
    onColumnVisibilityChange: () => jest.fn(),
    getCoreRowModel: jest.fn(),
    getFilteredRowModel: jest.fn(),
    getPaginationRowModel: jest.fn(),
    getSortedRowModel: jest.fn(),
    getFacetedRowModel: jest.fn(),
    getFacetedUniqueValues: jest.fn(),
  });

  return (
    <Select
      data-testid="select-testid"
      value={`${table.getState().pagination.pageSize}`}
      onValueChange={(value) => {
        table.setPageSize(Number(value));
      }}
    >
      <SelectTrigger className="h-8 w-[70px]">
        <SelectValue placeholder={table.getState().pagination.pageSize} />
      </SelectTrigger>
      <SelectContent side="top">
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <SelectItem key={pageSize} value={`${pageSize}`}>
            {pageSize}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

describe("Select", () => {
  window.HTMLElement.prototype.hasPointerCapture = jest.fn();
  window.HTMLElement.prototype.scrollIntoView = jest.fn();

  it("should render component", async () => {
    render(<Component data={tasks} columns={columns} />);
    const select = screen.getByRole("combobox");

    expect(select).toBeInTheDocument();
    expect(select).toHaveTextContent("10");
  });
  it("should change component", async () => {
    render(<Component data={tasks} columns={columns} />);
    const combobox = screen.getByRole("combobox");
    await userEvent.click(combobox);

    const options = screen.getAllByRole("option");
    await userEvent.click(options[1]);

    expect(combobox).toBeInTheDocument();
    expect(combobox).toHaveTextContent("20");
  });
});
