import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SkillCard } from "./SkillCard";
import type { Skill } from "../../../../data/skills";

describe("SkillCard", () => {
  it("renders name, level, and note with listitem semantics", () => {
    const skill: Skill = { name: "Vitest", level: "Strong", note: "Fast unit tests." };
    render(<SkillCard skill={skill} />);

    const item = screen.getByRole("listitem");
    expect(item).toBeInTheDocument();

    expect(screen.getByRole("heading", { level: 3, name: "Vitest" })).toBeInTheDocument();
    expect(screen.getByText("Strong")).toBeInTheDocument();
    expect(screen.getByText("Fast unit tests.")).toBeInTheDocument();
  });
});