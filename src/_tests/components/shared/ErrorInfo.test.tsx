import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";
import ErrorInfo from "../../../components/shared/ErrorInfo";
import "@testing-library/jest-dom";

// Mock the ErrorOutlineIcon component
vi.mock("../../../components/Icons", () => ({
  ErrorOutlineIcon: ({ className }: { className?: string }) => (
    <div data-testid="error-icon" className={className}>
      ⚠️
    </div>
  ),
}));

describe("ErrorInfo Component", () => {
  test("renders with default message and retry button", () => {
    render(<ErrorInfo />);

    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong. Please try again.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Try Again" })).toBeInTheDocument();
    expect(screen.getByTestId("error-icon")).toBeInTheDocument();
  });

  test("renders with custom message", () => {
    const customMessage = "Custom error message for testing";
    render(<ErrorInfo message={customMessage} />);

    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  test("calls default onRetry (window.location.reload) when button is clicked", async () => {
    const user = userEvent.setup();
    const originalReload = window.location.reload;
    const mockReload = vi.fn();

    // Mock window.location.reload\n    Object.defineProperty(window.location, 'reload', {\n      writable: true,\n      value: mockReload,\n    });\n\n    render(<ErrorInfo />);\n    \n    const retryButton = screen.getByRole(\"button\", { name: \"Try Again\" });\n    await user.click(retryButton);\n    \n    expect(mockReload).toHaveBeenCalledOnce();\n    \n    // Restore original reload\n    window.location.reload = originalReload;\n  });\n\n  test(\"calls custom onRetry function when provided\", async () => {\n    const user = userEvent.setup();\n    const mockOnRetry = vi.fn();\n    \n    render(<ErrorInfo onRetry={mockOnRetry} />);\n    \n    const retryButton = screen.getByRole(\"button\", { name: \"Try Again\" });\n    await user.click(retryButton);\n    \n    expect(mockOnRetry).toHaveBeenCalledOnce();\n  });\n\n  test(\"applies custom className\", () => {\n    render(<ErrorInfo className=\"custom-error-class\" />);\n    \n    const errorContainer = screen.getByText(\"Error\").closest(\"div\")?.parentElement;\n    expect(errorContainer).toHaveClass(\"custom-error-class\");\n  });\n\n  test(\"has correct default styling\", () => {\n    render(<ErrorInfo />);\n    \n    const errorContainer = screen.getByText(\"Error\").closest(\"div\")?.parentElement;\n    expect(errorContainer).toHaveClass(\n      \"flex\",\n      \"flex-col\",\n      \"items-center\",\n      \"justify-center\",\n      \"min-h-64\",\n      \"p-8\",\n      \"h-full\",\n      \"w-full\"\n    );\n  });\n\n  test(\"error icon has correct styling\", () => {\n    render(<ErrorInfo />);\n    \n    const errorIcon = screen.getByTestId(\"error-icon\");\n    expect(errorIcon).toHaveClass(\"mx-auto\", \"h-12\", \"w-12\", \"text-red-500\");\n  });\n\n  test(\"retry button has correct styling and accessibility\", () => {\n    render(<ErrorInfo />);\n    \n    const retryButton = screen.getByRole(\"button\", { name: \"Try Again\" });\n    expect(retryButton).toHaveClass(\n      \"inline-flex\",\n      \"items-center\",\n      \"px-4\",\n      \"py-2\",\n      \"border\",\n      \"border-transparent\",\n      \"text-sm\",\n      \"font-medium\",\n      \"rounded-md\",\n      \"shadow-sm\",\n      \"text-white\",\n      \"bg-red-600\",\n      \"hover:bg-red-700\",\n      \"focus:outline-none\",\n      \"focus:ring-2\",\n      \"focus:ring-offset-2\",\n      \"focus:ring-red-500\",\n      \"transition-colors\",\n      \"cursor-pointer\"\n    );\n  });\n\n  test(\"title has correct styling\", () => {\n    render(<ErrorInfo />);\n    \n    const title = screen.getByText(\"Error\");\n    expect(title).toHaveClass(\"text-lg\", \"font-medium\", \"text-gray-900\", \"mb-2\");\n  });\n\n  test(\"message has correct styling\", () => {\n    render(<ErrorInfo />);\n    \n    const message = screen.getByText(\"Something went wrong. Please try again.\");\n    expect(message).toHaveClass(\"text-gray-600\", \"mb-6\");\n  });\n\n  test(\"renders all elements in correct structure\", () => {\n    render(<ErrorInfo message=\"Test error\" />);\n    \n    // Check that all elements are present and in correct order\n    const errorContainer = screen.getByText(\"Test error\").closest(\".text-center\");\n    expect(errorContainer).toBeInTheDocument();\n    \n    // Check order of elements\n    const elements = errorContainer?.children;\n    expect(elements).toHaveLength(4); // icon container, title, message, button\n  });\n\n  test(\"combines custom className with default classes\", () => {\n    render(<ErrorInfo className=\"bg-blue-100 custom-spacing\" />);\n    \n    const errorContainer = screen.getByText(\"Error\").closest(\"div\")?.parentElement;\n    expect(errorContainer).toHaveClass(\n      \"bg-blue-100\",\n      \"custom-spacing\",\n      \"flex\",\n      \"flex-col\",\n      \"items-center\"\n    );\n  });\n});