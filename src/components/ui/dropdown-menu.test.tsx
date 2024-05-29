import { render, screen } from "@testing-library/react";
import { Button } from "./button";
import tasks from "../data/tasks";
import { columns } from "../data/columns";
import { ColumnDef, useReactTable } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="hidden h-8 lg:flex">
          Open
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

describe("DropdownMenu", () => {
  it("should render component", async () => {
    render(<Component data={tasks} columns={columns} />);
    const button = screen.getByTestId("button-testid");
    await userEvent.click(button);

    const dropdown = screen.getByTestId("dropdown-menu-testid");
    const list = screen.getAllByRole("menuitemcheckbox");

    expect(button).toBeInTheDocument();
    expect(dropdown).toBeInTheDocument();
    expect(list).toHaveLength(3);

    list.forEach((item) => {
      expect(item).toBeChecked();
    });
  });
});
