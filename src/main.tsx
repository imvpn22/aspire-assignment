import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "./components/shared/ErrorBoundry.tsx";
import { queryClient } from "./query/index.ts";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import CardsPage from "./pages/CardsPage.tsx";
import Home from "./pages/HomePage.tsx";
import PaymentsPage from "./pages/PaymentsPage.tsx";
import Credit from "./pages/CreditPage.tsx";
import Settings from "./pages/SettingsPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "cards",
        Component: CardsPage,
      },
      {
        path: "payments",
        Component: PaymentsPage,
      },
      {
        path: "credit",
        Component: Credit,
      },
      {
        path: "settings",
        Component: Settings,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);
