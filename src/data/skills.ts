export type Skill = {
  name: string;
  level: "Core" | "Strong" | "Working";
  note: string;
};

export const skills: Skill[] = [
  { name: "React", level: "Core", note: "Component architecture, hooks, state, a11y." },
  { name: "TypeScript", level: "Core", note: "Types-first UI, safer refactors." },
  { name: "CSS", level: "Strong", note: "Tokens, layout systems, responsive craft." },
  { name: "Testing", level: "Strong", note: "RTL + Vitest, behavior-first tests." },
  { name: "Performance", level: "Working", note: "Bundle hygiene, render profiling." },
  { name: "Design", level: "Working", note: "Minimal systems, hierarchy, copy." }
];