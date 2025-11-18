import { render, screen } from "@testing-library/react";
import Input from "../../../components/shared/Input";
import { describe, test, expect } from "vitest";

describe("Input Component", () => {
  test("renders input element", () => {
    render(<Input label={""} />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  test("accepts input value", () => {
    render(<Input label={""} />);
    const inputElement = screen.getByRole("textbox") as HTMLInputElement;
    inputElement.value = "Hello";
    expect(inputElement.value).toBe("Hello");
  });
});
