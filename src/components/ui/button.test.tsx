import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "./button";

const variants: ("secondary" | "destructive" | "outline" | "link" | "ghost")[] =
  ["secondary", "outline", "destructive", "link", "ghost"];

describe("Badge", () => {
  it.each(variants)("should render component using %s variant", (variant) => {
    const text = "any_text";

    render(<Button variant={variant}>{text}</Button>);

    const button = screen.getByTestId("button-testid");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(text);
  });

  it("should click on Button", () => {
    const func = jest.fn();
    const text = "any_text";

    render(<Button onClick={func}>{text}</Button>);

    const button = screen.getByTestId("button-testid");
    fireEvent.click(button);

    expect(func).toHaveBeenCalledTimes(1);
  });
});
