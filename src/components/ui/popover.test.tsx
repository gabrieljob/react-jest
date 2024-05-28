import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";

function Component() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <h1>Any Content</h1>
      </PopoverContent>
    </Popover>
  );
}

describe("Popover", () => {
  it("should render component", async () => {
    render(<Component />);

    const button = screen.getByTestId("button-testid");
    await userEvent.click(button);

    expect(screen.getByText("Any Content")).toBeInTheDocument();
  });
});
