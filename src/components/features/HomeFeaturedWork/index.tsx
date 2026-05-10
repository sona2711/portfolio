import { Carousel, Typography } from "antd";
import { Link } from "react-router-dom";
import { FeaturedWorkCard } from "../../_shared/FeaturedWorkCard";
import { SectionHeader } from "../../_shared/SectionHeader";
import { FEATURED_WORK_LINK_LABEL, FEATURED_WORK_SUBTITLE } from "./consts";
import type { HomeFeaturedWorkProps } from "./types";
import styles from "./styles.module.css";

export const HomeFeaturedWork = ({ items }: HomeFeaturedWorkProps) => {
  if (items.length === 0) {
    return null;
  }

  const showControls = items.length > 1;

  return (
    <section className={styles.section} aria-label="Featured work projects">
      <div className={styles.headerRow}>
        <div>
          <SectionHeader title="Featured Work" />
          <Typography.Paragraph className={styles.subtitle}>
            {FEATURED_WORK_SUBTITLE}
          </Typography.Paragraph>
        </div>
        <Link to="/projects" className={styles.allProjectsLink}>
          {FEATURED_WORK_LINK_LABEL}
        </Link>
      </div>
      <div className={styles.carouselWrap}>
        <Carousel
          className={styles.carousel}
          dots={showControls}
          arrows={showControls}
          infinite={showControls}
          draggable={showControls}
          dotPlacement="bottom"
        >
          {items.map((item, index) => (
            <div key={item.title} className={styles.slide}>
              <FeaturedWorkCard
                item={item}
                imageDirection={index % 2 === 0 ? "right" : "left"}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};
