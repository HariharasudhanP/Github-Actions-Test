import styles from "./SkillCard.module.css";
import type { Skill } from "../../../../data/skills";

export function SkillCard({ skill }: { skill: Skill }) {
  return (
    <article className={styles.card} role="listitem" aria-label={skill.name}>
      <div className={styles.topRow}>
        <h3 className={styles.name}>{skill.name}</h3>
        <span className={styles.level} data-level={skill.level}>
          {skill.level}
        </span>
      </div>
      <p className={styles.note}>{skill.note}</p>
    </article>
  );
}