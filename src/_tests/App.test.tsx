import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

describe("App Component", () => {
  it("renders correctly", () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  it("has the correct title", () => {
    render(<App />);
    expect(screen.getByText("Expected Title")).toBeInTheDocument();
  });
});
