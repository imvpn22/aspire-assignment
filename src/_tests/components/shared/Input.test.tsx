import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";
import Input from "../../../components/shared/Input";
import "@testing-library/jest-dom";

describe("Input Component", () => {
  test("renders input element with label", () => {
    render(<Input label="Test Label" />);
    const inputElement = screen.getByRole("textbox");
    const labelElement = screen.getByText("Test Label");

    expect(inputElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
  });

  test("accepts user input", async () => {
    const user = userEvent.setup();
    render(<Input label="Test Input" />);

    const inputElement = screen.getByRole("textbox");
    await user.type(inputElement, "Hello World");

    expect(inputElement).toHaveValue("Hello World");
  });

  test("shows required asterisk when required prop is true", () => {
    render(<Input label="Required Field" required />);

    const asterisk = screen.getByText("*");
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveClass("text-red-500");
  });

  test("renders with placeholder text", () => {
    render(<Input label="Test" placeholder="Enter text here" />);

    const inputElement = screen.getByPlaceholderText("Enter text here");
    expect(inputElement).toBeInTheDocument();
  });

  test("is disabled when disabled prop is true", () => {
    render(<Input label="Test" disabled />);

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeDisabled();
    expect(inputElement).toHaveClass("disabled:bg-gray-100");
  });

  test("calls onChange when value changes", async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();

    render(<Input label="Test" onChange={mockOnChange} />);

    const inputElement = screen.getByRole("textbox");
    await user.type(inputElement, "a");

    expect(mockOnChange).toHaveBeenCalled();
  });

  test("handles different input types", () => {
    render(<Input label="Password" type="password" />);

    const inputElement = screen.getByLabelText("Password");
    expect(inputElement).toHaveAttribute("type", "password");
  });

  test("supports controlled input with value prop", async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();

    render(
      <Input label="Controlled" value="initial" onChange={mockOnChange} />
    );

    const inputElement = screen.getByDisplayValue("initial");
    expect(inputElement).toHaveValue("initial");

    await user.clear(inputElement);
    await user.type(inputElement, "new value");

    expect(mockOnChange).toHaveBeenCalled();
  });

  test("applies custom HTML attributes", () => {
    render(<Input label="Custom" data-testid="custom-input" maxLength={10} />);

    const inputElement = screen.getByTestId("custom-input");
    expect(inputElement).toHaveAttribute("maxLength", "10");
  });

  test("has proper focus styles", () => {
    render(<Input label="Focus Test" />);

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveClass("focus:ring-2", "focus:ring-blue-500");
  });
});
