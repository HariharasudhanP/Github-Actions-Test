import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("SkillsSection", () => {
  it("renders a labeled list and one listitem per skill", async () => {
    const { SkillsSection } = await import("./SkillsSection");

    render(<SkillsSection />);

    const list = screen.getByRole("list", { name: /skills list/i });
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(6);

    // spot-check seeded content rendering end-to-end (data -> UI)
    expect(within(list).getByRole("heading", { name: "React", level: 3 })).toBeVisible();
    expect(within(list).getByText(/component architecture/i)).toBeInTheDocument();
    expect(within(list).getByText("Core")).toBeInTheDocument();
  });

  it("renders the empty state (role=status) when there are no skills", async () => {
    vi.resetModules();
    vi.doMock("../../data/skills", () => ({ skills: [] }));

    const { SkillsSection } = await import("./SkillsSection");

    render(<SkillsSection />);

    expect(screen.queryByRole("list", { name: /skills list/i })).not.toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(/no skills added yet/i);
    expect(screen.getByText(/src\/data\/skills\.ts/i)).toBeInTheDocument();
  });

  it("renders the levels key with all three labels", async () => {
    const { SkillsSection } = await import("./SkillsSection");

    render(<SkillsSection />);

    const key = screen.getByLabelText(/skill levels key/i);
    expect(within(key).getByText("Core")).toBeInTheDocument();
    expect(within(key).getByText("Strong")).toBeInTheDocument();
    expect(within(key).getByText("Working")).toBeInTheDocument();
  });
});