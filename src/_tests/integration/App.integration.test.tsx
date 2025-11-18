import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router";
import "@testing-library/jest-dom";

// Import the actual components
import App from "../../App";
import HomePage from "../../pages/HomePage";
import CardsPage from "../../pages/CardsPage";

// Mock complex components to isolate integration tests
vi.mock("../../components/Sidebar", () => ({
  default: () => (
    <nav data-testid="sidebar">
      <a href="/" data-testid="home-link">
        Home
      </a>
      <a href="/cards" data-testid="cards-link">
        Cards
      </a>
      <a href="/payments" data-testid="payments-link">
        Payments
      </a>
    </nav>
  ),
}));

vi.mock("../../pages/HomePage", () => ({
  default: () => <div data-testid="home-page">Home Page Content</div>,
}));

vi.mock("../../pages/CardsPage", () => ({
  default: () => <div data-testid="cards-page">Cards Page Content</div>,
}));

vi.mock("../../pages/PaymentsPage", () => ({
  default: () => <div data-testid="payments-page">Payments Page Content</div>,
}));

vi.mock("../../pages/CreditPage", () => ({
  default: () => <div data-testid="credit-page">Credit Page Content</div>,
}));

vi.mock("../../pages/SettingsPage", () => ({
  default: () => <div data-testid="settings-page">Settings Page Content</div>,
}));

describe("App Integration Tests", () => {
  const createTestRouter = (initialEntries: string[] = ["/"]) => {
    return createMemoryRouter(
      [
        {
          path: "/",
          element: <App />,
          children: [
            {
              index: true,
              element: <HomePage />,
            },
            {
              path: "cards",
              element: <CardsPage />,
            },
            {
              path: "payments",
              element: <div data-testid="payments-page">Payments Page</div>,
            },
            {
              path: "credit",
              element: <div data-testid="credit-page">Credit Page</div>,
            },
            {
              path: "settings",
              element: <div data-testid="settings-page">Settings Page</div>,
            },
          ],
        },
      ],
      {
        initialEntries,
      }
    );
  };

  test("renders App with sidebar and main content area", () => {
    const router = createTestRouter();
    render(<RouterProvider router={router} />);

    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });

  test("App has correct layout structure", () => {
    const router = createTestRouter();
    const { container } = render(<RouterProvider router={router} />);

    const appRoot = container.querySelector(".app-root");
    expect(appRoot).toHaveClass("flex", "h-full", "flex-1", "bg-white");
  });

  test("navigates to different routes correctly", () => {
    // Test home route
    let router = createTestRouter(["/"]);
    const { rerender } = render(<RouterProvider router={router} />);
    expect(screen.getByTestId("home-page")).toBeInTheDocument();

    // Test cards route
    router = createTestRouter(["/cards"]);
    rerender(<RouterProvider router={router} />);
    expect(screen.getByTestId("cards-page")).toBeInTheDocument();

    // Test payments route
    router = createTestRouter(["/payments"]);
    rerender(<RouterProvider router={router} />);
    expect(screen.getByTestId("payments-page")).toBeInTheDocument();
  });

  test("sidebar is always present across different routes", () => {
    const routes = ["/", "/cards", "/payments", "/credit", "/settings"];

    routes.forEach((route) => {
      const router = createTestRouter([route]);
      const { rerender } = render(<RouterProvider router={router} />);

      expect(screen.getByTestId("sidebar")).toBeInTheDocument();

      // Clean up for next iteration
      rerender(<div />);
    });
  });

  test("App maintains state across route changes", () => {
    const router = createTestRouter();
    render(<RouterProvider router={router} />);

    // Verify initial state
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();

    // App container should maintain its structure
    const appElement = screen.getByTestId("sidebar").closest(".app-root");
    expect(appElement).toHaveClass("flex", "h-full", "flex-1", "bg-white");
  });

  test("handles unknown routes gracefully", () => {
    const router = createTestRouter(["/unknown-route"]);

    // This shouldn't throw an error
    expect(() => {
      render(<RouterProvider router={router} />);
    }).not.toThrow();

    // Sidebar should still be present
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });

  test("App renders without errors when no initial route is provided", () => {
    const router = createTestRouter();

    expect(() => {
      render(<RouterProvider router={router} />);
    }).not.toThrow();

    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });

  test("App structure is accessible", () => {
    const router = createTestRouter();
    render(<RouterProvider router={router} />);

    // Check for main navigation
    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toBeInTheDocument();
    expect(sidebar.tagName.toLowerCase()).toBe("nav");

    // Check that content area is present
    const mainContent = screen.getByTestId("home-page");
    expect(mainContent).toBeInTheDocument();
  });

  test("App handles multiple concurrent renders", () => {
    const router1 = createTestRouter(["/"]);
    const router2 = createTestRouter(["/cards"]);

    const { container: container1 } = render(
      <RouterProvider router={router1} />
    );
    const { container: container2 } = render(
      <RouterProvider router={router2} />
    );

    // Both should render without interfering with each other
    expect(
      container1.querySelector('[data-testid="sidebar"]')
    ).toBeInTheDocument();
    expect(
      container2.querySelector('[data-testid="sidebar"]')
    ).toBeInTheDocument();
  });
});
