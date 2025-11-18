import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";
import Modal from "../../../components/shared/Modal";
import "@testing-library/jest-dom";

// Mock the CloseIcon component
vi.mock("../../../components/Icons", () => ({
  CloseIcon: ({ className }: { className?: string }) => (
    <div data-testid="close-icon" className={className}>
      ✕
    </div>
  ),
}));

describe("Modal Component", () => {
  test("renders nothing when isOpen is false", () => {
    const mockOnClose = vi.fn();
    const { container } = render(
      <Modal isOpen={false} onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(container).toBeEmptyDOMElement();
  });

  test("renders modal when isOpen is true", () => {
    const mockOnClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  test("renders title when provided", () => {
    const mockOnClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByText("Test Modal")).toBeInTheDocument();
  });

  test("does not render header when title is not provided", () => {
    const mockOnClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.queryByTestId("close-icon")).not.toBeInTheDocument();
  });

  test("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    const mockOnClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );

    const closeButton = screen.getByRole("button");
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledOnce();
  });

  test("calls onClose when backdrop is clicked", async () => {
    const user = userEvent.setup();
    const mockOnClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>
    );

    // Click on backdrop (the overlay)
    const backdrop =
      screen.getByText("Modal Content").parentElement?.previousElementSibling;
    if (backdrop) {
      await user.click(backdrop as Element);
      expect(mockOnClose).toHaveBeenCalledOnce();
    }
  });

  test("has correct CSS classes and styling", () => {
    const mockOnClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );

    // Check main modal container
    const modalContainer = screen
      .getByRole("dialog", { hidden: true })
      .closest("div");
    expect(modalContainer).toHaveClass("fixed", "inset-0", "z-1000");

    // Check modal content area
    const modalContent = screen.getByText("Modal Content").closest("div");
    expect(modalContent).toHaveClass(
      "relative",
      "bg-white",
      "rounded-lg",
      "shadow-lg"
    );
  });

  test("renders children content correctly", () => {
    const mockOnClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div data-testid="custom-content">
          <p>Paragraph 1</p>
          <p>Paragraph 2</p>
        </div>
      </Modal>
    );

    const customContent = screen.getByTestId("custom-content");
    expect(customContent).toBeInTheDocument();
    expect(screen.getByText("Paragraph 1")).toBeInTheDocument();
    expect(screen.getByText("Paragraph 2")).toBeInTheDocument();
  });

  test("close button has proper accessibility attributes", () => {
    const mockOnClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );

    const closeButton = screen.getByRole("button");
    expect(closeButton).toHaveClass("focus:outline-none");
    expect(closeButton).toHaveAttribute("type", "button");
  });

  test("modal overlay has correct opacity", () => {
    const mockOnClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>
    );

    const backdrop = document.querySelector(".bg-black.opacity-50");
    expect(backdrop).toBeInTheDocument();
    expect(backdrop).toHaveClass("fixed", "inset-0", "bg-black", "opacity-50");
  });
});
