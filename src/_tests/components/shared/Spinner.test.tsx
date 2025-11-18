import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import Spinner from "../../../components/shared/Spinner";
import "@testing-library/jest-dom";

describe("Spinner Component", () => {
  test("renders spinner with default props", () => {
    render(<Spinner />);

    const spinnerContainer = screen.getByText("Loading...").parentElement;
    expect(spinnerContainer).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders with default medium size", () => {
    render(<Spinner />);

    const spinner = document.querySelector(".animate-spin");
    expect(spinner).toHaveClass("w-8", "h-8");
  });

  test("renders with small size", () => {
    render(<Spinner size="small" />);

    const spinner = document.querySelector(".animate-spin");
    expect(spinner).toHaveClass("w-4", "h-4");
  });

  test("renders with large size", () => {
    render(<Spinner size="large" />);

    const spinner = document.querySelector(".animate-spin");
    expect(spinner).toHaveClass("w-12", "h-12");
  });

  test("applies custom color", () => {
    render(<Spinner color="#ff0000" />);

    const spinner = document.querySelector(".animate-spin");
    expect(spinner).toHaveStyle({ borderTopColor: "#ff0000" });
  });

  test("applies default color", () => {
    render(<Spinner />);

    const spinner = document.querySelector(".animate-spin");
    expect(spinner).toHaveStyle({ borderTopColor: "#3b82f6" });
  });

  test("applies custom className", () => {
    render(<Spinner className="custom-class" />);

    const spinnerContainer = screen.getByText("Loading...").parentElement;
    expect(spinnerContainer).toHaveClass("custom-class");
  });

  test("has proper CSS classes for layout", () => {
    render(<Spinner />);

    const spinnerContainer = screen.getByText("Loading...").parentElement;
    expect(spinnerContainer).toHaveClass(
      "w-full",
      "h-full",
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
      "gap-2"
    );
  });

  test("spinner element has animation class", () => {
    render(<Spinner />);

    const spinner = document.querySelector(".animate-spin");
    expect(spinner).toHaveClass("animate-spin", "rounded-full");
  });

  test("loading text has correct styling", () => {
    render(<Spinner />);

    const loadingText = screen.getByText("Loading...");
    expect(loadingText).toHaveClass("text-sm", "text-gray-600");
  });

  test("combines custom className with default classes", () => {
    render(<Spinner className="bg-red-100 p-4" />);

    const spinnerContainer = screen.getByText("Loading...").parentElement;
    expect(spinnerContainer).toHaveClass(
      "bg-red-100",
      "p-4",
      "w-full",
      "h-full"
    );
  });

  test("renders with all size variants", () => {
    const { rerender } = render(<Spinner size="small" />);
    expect(document.querySelector(".animate-spin")).toHaveClass("w-4", "h-4");

    rerender(<Spinner size="medium" />);
    expect(document.querySelector(".animate-spin")).toHaveClass("w-8", "h-8");

    rerender(<Spinner size="large" />);
    expect(document.querySelector(".animate-spin")).toHaveClass("w-12", "h-12");
  });

  test("spinner has correct border styles", () => {
    render(<Spinner />);

    const spinner = document.querySelector(".animate-spin");
    expect(spinner).toHaveClass(
      "border-2",
      "border-gray-300",
      "border-t-current"
    );
  });
});
