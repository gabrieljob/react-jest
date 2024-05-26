import { render, screen } from "@testing-library/react";
import { Badge } from "./badge";

const variants: ("default" | "secondary" | "outline" | "destructive")[] = [
  "default",
  "secondary",
  "outline",
  "destructive",
];

describe("Badge", () => {
  it.each(variants)("should render component using %s variant", (variant) => {
    const text = "any_text";
    render(<Badge variant={variant}>{text}</Badge>);

    const badge = screen.getByTestId("badge-testid");

    expect(badge).toBeInTheDocument();
  });
});
