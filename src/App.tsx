import styles from "./App.module.css";
import { SiteHeader } from "./components/SiteHeader/SiteHeader";
import { SiteFooter } from "./components/SiteFooter/SiteFooter";
import { SkillsSection } from "./sections/SkillsSection/SkillsSection";
import { AboutSection } from "./sections/AboutSection/AboutSection";

export default function App() {
  return (
    <div className={styles.app}>
      <a className={styles.skipLink} href="#main">
        Skip to content
      </a>

      <SiteHeader />

      <main id="main" className={styles.main}>
        <div className={styles.layout}>
          <AboutSection />
          <SkillsSection />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}