import { AboutHero } from "../../components/features/AboutHero";
import { AboutEducation } from "../../components/features/AboutEducation";
import { AboutTechnicalProficiency } from "../../components/features/AboutTechnicalProficiency";
import { AboutCTA } from "../../components/features/AboutCTA";
import styles from "./styles.module.css";

export const AboutPage = () => {
  return (
    <div className={styles.wrapper}>
      <AboutHero />
      <AboutEducation />
      <AboutTechnicalProficiency />
      <AboutCTA />
    </div>
  );
};