import { fireEvent, render, screen } from "@testing-library/react";
import { Input } from "./input";
import userEvent from "@testing-library/user-event";

describe("Input", () => {
  it("should render component", () => {
    render(<Input />);

    const input = screen.getByTestId("input-testid");

    expect(input).toBeInTheDocument();
  });
  it("should type anything on input type text", async () => {
    render(<Input />);
    const text = "any_text";
    const input = screen.getByTestId("input-testid");
    await userEvent.type(input, text);

    expect(input).toHaveValue(text);
  });
  it("should upload a file on input type file", async () => {
    render(<Input />);

    const input = screen.getByTestId("input-testid") as HTMLInputElement;
    const file = new File(["any_file"], "any_file.png", {
      type: "image/png",
    });
    Object.defineProperty(input, "files", {
      value: [file],
    });
    fireEvent.change(input);
    expect(input.files).toHaveLength(1);
  });
  it("should input be disabled", async () => {
    render(<Input disabled />);

    const input = screen.getByTestId("input-testid") as HTMLInputElement;
    expect(input).toBeDisabled();
  });
});
