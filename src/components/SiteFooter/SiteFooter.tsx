import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copy}>
          <span className={styles.mono}>© {year}</span>{" "}
          <span className={styles.dim}>Built as a minimal, editable single page.</span>
        </p>

        <a className={styles.top} href="#main">
          Back to top
        </a>
      </div>
    </footer>
  );
}