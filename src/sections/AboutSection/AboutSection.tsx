import styles from "./AboutSection.module.css";

export function AboutSection() {
  return (
    <section className={styles.section} id="about" aria-labelledby="about-title">
      <div className={styles.card}>
        <p className={styles.eyebrow}>About me</p>
        <h1 className={styles.title} id="about-title">
          I build calm, fast interfaces—then test them until they’re boringly reliable.
        </h1>
        <p className={styles.lede}>
          This is a single-page “About Me” focused on skills. Edit the content in{" "}
          <code className={styles.code}>src/data/skills.ts</code>.
        </p>

        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Focus</span>
            <span className={styles.metaValue}>Frontend engineering</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Style</span>
            <span className={styles.metaValue}>Minimal, token-driven</span>
          </div>
        </div>
      </div>
    </section>
  );
}