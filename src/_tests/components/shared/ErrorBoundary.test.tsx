import React from "react";
import { render } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom";
import ErrorBoundary from "../../../components/shared/ErrorBoundry";

// Component that throws an error when shouldThrow is true
const ThrowError: React.FC<{ shouldThrow: boolean }> = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error("Test error");
  }
  return <div>No error</div>;
};

// Component that doesn't throw an error
const NoError = () => <div data-testid="no-error">Working component</div>;

describe("ErrorBoundary Component", () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Suppress console.error in tests since we expect errors
    consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test("renders children when there is no error", () => {
    const { getByTestId } = render(
      <ErrorBoundary>
        <NoError />
      </ErrorBoundary>
    );

    expect(getByTestId("no-error")).toBeInTheDocument();
  });

  test("renders ErrorInfo when child component throws an error", () => {
    const { getByTestId } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(getByTestId("error-info")).toBeInTheDocument();
  });

  test("renders ErrorInfo with custom message when error occurs", () => {
    const customMessage = "Custom error boundary message";
    const { getByText } = render(
      <ErrorBoundary message={customMessage}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(getByText(customMessage)).toBeInTheDocument();
  });
  test("does not render ErrorInfo when fallback is false", () => {
    const { container } = render(
      <ErrorBoundary fallback={false}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // When fallback is false and error occurs, nothing should render
    expect(container).toBeEmptyDOMElement();
  });

  test("calls onCatch callback when error occurs", () => {
    const mockOnCatch = vi.fn();

    render(
      <ErrorBoundary onCatch={mockOnCatch}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(mockOnCatch).toHaveBeenCalledOnce();
  });

  test("does not call onCatch when no error occurs", () => {
    const mockOnCatch = vi.fn();

    render(
      <ErrorBoundary onCatch={mockOnCatch}>
        <NoError />
      </ErrorBoundary>
    );

    expect(mockOnCatch).not.toHaveBeenCalled();
  });

  test("updates state when componentDidCatch is called", () => {
    const { getByTestId } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // After error is thrown, ErrorInfo should be rendered
    expect(getByTestId("error-info")).toBeInTheDocument();
  });

  test("renders children normally before error occurs", () => {
    const { getByText, rerender } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(getByText("No error")).toBeInTheDocument();

    // Now trigger an error
    rerender(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(
      getByText("Something went wrong. Please try again.")
    ).toBeInTheDocument();
  });

  test("uses default fallback value when not provided", () => {
    const { getByTestId } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Default fallback should be true, so ErrorInfo should render
    expect(getByTestId("error-info")).toBeInTheDocument();
  });

  test("handles multiple children", () => {
    const { getByText, getByTestId } = render(
      <ErrorBoundary>
        <div>Child 1</div>
        <div>Child 2</div>
        <NoError />
      </ErrorBoundary>
    );

    expect(getByText("Child 1")).toBeInTheDocument();
    expect(getByText("Child 2")).toBeInTheDocument();
    expect(getByTestId("no-error")).toBeInTheDocument();
  });

  test("maintains error state after error is caught", () => {
    const { getByTestId, rerender } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(getByTestId("error-info")).toBeInTheDocument();

    // Re-render with non-throwing component, but error state should persist
    rerender(
      <ErrorBoundary>
        <NoError />
      </ErrorBoundary>
    );

    // Error boundary should still show error info because state is maintained
    expect(getByTestId("error-info")).toBeInTheDocument();
  });
});
