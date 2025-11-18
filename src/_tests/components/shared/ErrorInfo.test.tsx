import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import ErrorInfo from "../../../components/shared/ErrorInfo";

describe("ErrorInfo Component", () => {
  test("renders error icon and default message", () => {
    render(<ErrorInfo />);

    expect(screen.getByTestId("error-icon")).toBeInTheDocument();
    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(
      screen.getByText("Something went wrong. Please try again.")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Try Again" })
    ).toBeInTheDocument();
  });

  test("renders custom message when provided", () => {
    const customMessage = "Custom error message for testing";
    render(<ErrorInfo message={customMessage} />);

    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  test.skip("calls default onRetry (window.location.reload) when button is clicked", async () => {
    const user = userEvent.setup();
    const mockReload = vi.fn();

    // Mock window.location.reload
    const originalReload = Object.getOwnPropertyDescriptor(
      window.location,
      "reload"
    );
    Object.defineProperty(window.location, "reload", {
      configurable: true,
      enumerable: true,
      value: mockReload,
      writable: true,
    });

    render(<ErrorInfo />);

    const retryButton = screen.getByRole("button", { name: "Try Again" });
    await user.click(retryButton);

    expect(mockReload).toHaveBeenCalledOnce();

    // Restore original reload
    if (originalReload) {
      Object.defineProperty(window.location, "reload", originalReload);
    }
  });

  test("calls custom onRetry function when provided", async () => {
    const user = userEvent.setup();
    const mockOnRetry = vi.fn();

    render(<ErrorInfo onRetry={mockOnRetry} />);

    const retryButton = screen.getByRole("button", { name: "Try Again" });
    await user.click(retryButton);

    expect(mockOnRetry).toHaveBeenCalledOnce();
  });

  test("applies custom className", () => {
    render(<ErrorInfo className="custom-error-class" />);

    const errorContainer = screen
      .getByText("Error")
      .closest("div")?.parentElement;
    expect(errorContainer).toHaveClass("custom-error-class");
  });

  test("has correct default styling", () => {
    render(<ErrorInfo />);

    const errorContainer = screen
      .getByText("Error")
      .closest("div")?.parentElement;
    expect(errorContainer).toHaveClass(
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
      "min-h-64",
      "p-8",
      "h-full",
      "w-full"
    );
  });

  test("error icon has correct styling", () => {
    render(<ErrorInfo />);

    const errorIcon = screen.getByTestId("error-icon");
    expect(errorIcon).toHaveClass("mx-auto", "h-12", "w-12", "text-red-500");
  });

  test("retry button has correct styling and accessibility", () => {
    render(<ErrorInfo />);

    const retryButton = screen.getByRole("button", { name: "Try Again" });
    expect(retryButton).toHaveClass(
      "inline-flex",
      "items-center",
      "px-4",
      "py-2",
      "border",
      "border-transparent",
      "text-sm",
      "font-medium",
      "rounded-md",
      "shadow-sm",
      "text-white",
      "bg-red-600",
      "hover:bg-red-700",
      "focus:outline-none",
      "focus:ring-2",
      "focus:ring-offset-2",
      "focus:ring-red-500",
      "transition-colors",
      "cursor-pointer"
    );
  });

  test("title has correct styling", () => {
    render(<ErrorInfo />);

    const title = screen.getByText("Error");
    expect(title).toHaveClass(
      "text-lg",
      "font-medium",
      "text-gray-900",
      "mb-2"
    );
  });

  test("message has correct styling", () => {
    render(<ErrorInfo />);

    const message = screen.getByText("Something went wrong. Please try again.");
    expect(message).toHaveClass("text-gray-600", "mb-6");
  });

  test("renders all elements in correct structure", () => {
    render(<ErrorInfo message="Test error" />);

    // Check that all elements are present and in correct order
    const errorContainer = screen
      .getByText("Test error")
      .closest(".text-center");
    expect(errorContainer).toBeInTheDocument();

    // Check order of elements
    const elements = errorContainer?.children;
    expect(elements).toHaveLength(4); // icon container, title, message, button
  });

  test("combines custom className with default classes", () => {
    render(<ErrorInfo className="bg-blue-100 custom-spacing" />);

    const errorContainer = screen
      .getByText("Error")
      .closest("div")?.parentElement;
    expect(errorContainer).toHaveClass(
      "bg-blue-100",
      "custom-spacing",
      "flex",
      "flex-col",
      "items-center"
    );
  });
});
