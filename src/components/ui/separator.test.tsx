import { render, screen } from "@testing-library/react";
import { Separator } from "./separator";

describe("Separator", () => {
  it("should render component", () => {
    render(<Separator />);

    const separator = screen.getByTestId("separator-testid");

    expect(separator).toBeInTheDocument();
  });
});
