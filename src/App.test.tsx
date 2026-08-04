import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders header navigation and main landmarks", () => {
    render(<App />);

    expect(screen.getByRole("navigation", { name: /primary/i })).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders Skills section and list", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /skills/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("list", { name: /skills list/i })).toBeInTheDocument();
    // at least one list item from seeded data
    expect(screen.getAllByRole("listitem").length).toBeGreaterThan(0);
  });

  it("includes skip link targeting main content", () => {
    render(<App />);
    const skip = screen.getByRole("link", { name: /skip to content/i });
    expect(skip).toHaveAttribute("href", "#main");
  });
});