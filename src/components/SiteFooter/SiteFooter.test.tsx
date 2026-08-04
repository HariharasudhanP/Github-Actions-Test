import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SiteFooter } from "./SiteFooter";

describe("SiteFooter", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders current year deterministically (mocked time)", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2035-06-01T00:00:00.000Z"));

    render(<SiteFooter />);

    expect(screen.getByText(/© 2035/i)).toBeInTheDocument();
  });

  it("includes Back to top link targeting #main", () => {
    render(<SiteFooter />);
    expect(screen.getByRole("link", { name: /back to top/i })).toHaveAttribute(
      "href",
      "#main"
    );
  });
});