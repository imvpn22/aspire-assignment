import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import "@testing-library/jest-dom";
import App from "../App";

// Mock the Sidebar component since it likely has complex dependencies
vi.mock("../components/Sidebar", () => {
  return {
    default: () => <div data-testid="sidebar">Sidebar</div>,
  };
});

describe("App Component", () => {
  const createTestRouter = () => {
    return createMemoryRouter([
      {
        path: "/",
        element: <App />,
        children: [
          {
            index: true,
            element: <div>Home Page</div>,
          },
        ],
      },
    ]);
  };

  it("renders correctly with router", () => {
    const router = createTestRouter();
    const { container } = render(<RouterProvider router={router} />);
    expect(container).toBeInTheDocument();
  });

  it("renders main app structure", () => {
    const router = createTestRouter();
    const { getByTestId } = render(<RouterProvider router={router} />);

    const sidebar = getByTestId("sidebar");
    expect(sidebar).toBeInTheDocument();
  });

  it("has correct CSS classes for layout", () => {
    const router = createTestRouter();
    const { container } = render(<RouterProvider router={router} />);

    const appRoot = container.querySelector(".app-root");
    expect(appRoot).toHaveClass(
      "flex",
      "h-full",
      "flex-1",
      "app-root",
      "bg-white"
    );
  });
});
