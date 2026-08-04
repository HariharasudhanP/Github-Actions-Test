import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand} aria-label="Site">
          <span className={styles.mark} aria-hidden="true">
            ∿
          </span>
          <span className={styles.name}>About</span>
        </div>

        <nav className={styles.nav} aria-label="Primary">
          <a className={styles.link} href="#skills">
            Skills
          </a>
          <a className={styles.link} href="#about">
            About
          </a>
        </nav>
      </div>
    </header>
  );
}