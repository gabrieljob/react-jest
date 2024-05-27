import { fireEvent, render, screen } from "@testing-library/react";
import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  it("should render component", () => {
    render(<Checkbox />);

    const checkbox = screen.getByTestId("checkbox-testid");

    expect(checkbox).toBeInTheDocument();
  });

  it("should click on Checkbox", () => {
    render(<Checkbox />);

    const checkbox = screen.getByTestId("checkbox-testid");
    fireEvent.click(checkbox);

    expect(checkbox).toBeTruthy();
  });
});
