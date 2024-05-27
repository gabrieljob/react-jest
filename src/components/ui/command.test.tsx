import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./command";
import {
  CalendarIcon,
  GearIcon,
  ReaderIcon,
  PersonIcon,
  BellIcon,
} from "@radix-ui/react-icons";
import userEvent from "@testing-library/user-event";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

window.HTMLElement.prototype.scrollIntoView = jest.fn();

const renderComponent = () => {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <BellIcon className="mr-2 h-4 w-4" />
            <span>Notification</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <PersonIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </CommandItem>
          <CommandItem>
            <ReaderIcon className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </CommandItem>
          <CommandItem>
            <GearIcon className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

describe("Command", () => {
  it("should render component using", () => {
    render(renderComponent());

    const command = screen.getByTestId("command-testid");
    const list = screen.getAllByRole("group");

    expect(command).toBeInTheDocument();
    expect(list).toHaveLength(2);
  });

  it("should filter options by text", async () => {
    render(renderComponent());

    const input = screen.getByRole("combobox");
    await userEvent.type(input, "Calendar");
    const list = screen.getAllByRole("group");

    expect(input).toHaveValue("Calendar");
    expect(list).toHaveLength(1);
  });

  it("should move between options using ctrl+j", async () => {
    render(renderComponent());

    const input = screen.getByRole("combobox");

    await waitFor(() => {
      fireEvent.keyDown(input, { key: "j", code: 74, ctrlKey: true });
    });

    const option = screen.getByRole("option", { selected: true });

    expect(option).toHaveTextContent("Notification");
  });

  it("should move between options using ctrl+k", async () => {
    render(renderComponent());

    const input = screen.getByRole("combobox");

    await waitFor(() => {
      fireEvent.keyDown(input, { key: "j", code: 74, ctrlKey: true });
    });

    const notificationOption = screen.getByRole("option", { selected: true });

    expect(notificationOption).toHaveTextContent("Notification");

    await waitFor(() => {
      fireEvent.keyDown(input, { key: "k", code: 75, ctrlKey: true });
    });

    const calendarOption = screen.getByRole("option", { selected: true });

    expect(calendarOption).toHaveTextContent("Calendar");
  });
});
