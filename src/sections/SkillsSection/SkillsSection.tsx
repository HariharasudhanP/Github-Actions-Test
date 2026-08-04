import styles from "./SkillsSection.module.css";
import { skills } from "../../data/skills";
import { SkillCard } from "./components/SkillCard/SkillCard";

export function SkillsSection() {
  return (
    <section className={styles.section} id="skills" aria-labelledby="skills-title">
      <div className={styles.headerRow}>
        <div>
          <h2 className={styles.title} id="skills-title">
            Skills
          </h2>
          <p className={styles.subtitle}>A compact list, optimized for quick scanning.</p>
        </div>
        <div className={styles.key} aria-label="Skill levels key">
          <span className={styles.pill} data-level="Core">
            Core
          </span>
          <span className={styles.pill} data-level="Strong">
            Strong
          </span>
          <span className={styles.pill} data-level="Working">
            Working
          </span>
        </div>
      </div>

      {skills.length === 0 ? (
        <div className={styles.empty} role="status">
          No skills added yet. Edit <code className={styles.code}>src/data/skills.ts</code>.
        </div>
      ) : (
        <div className={styles.grid} role="list" aria-label="Skills list">
          {skills.map((s) => (
            <SkillCard key={s.name} skill={s} />
          ))}
        </div>
      )}
    </section>
  );
}