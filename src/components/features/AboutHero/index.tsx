import { AudioOutlined, FileImageOutlined } from "@ant-design/icons";
import { Button, Col, Row, Typography } from "antd";
import sonaImage from "../../../assets/images/Sona_About.png";
import {
  ABOUT_HERO_DESCRIPTION,
  ABOUT_HERO_HEADING_HIGHLIGHT,
  ABOUT_HERO_HEADING_PRIMARY,
  ABOUT_HERO_HEADING_SUFFIX,
  ABOUT_HERO_LABEL,
} from "./consts";
import styles from "./styles.module.css";
import type { AboutHeroProps } from "./types";

export const AboutHero = (props: AboutHeroProps) => {
  void props;

  return (
    <section className={styles.section}>
      <Row gutter={[40, 40]} align="middle">
        <Col xs={24} lg={14}>
          <div className={styles.content}>
            <Typography.Text className={styles.label}>{ABOUT_HERO_LABEL}</Typography.Text>
            <Typography.Title level={1} className={styles.heading}>
              <span>{ABOUT_HERO_HEADING_PRIMARY}</span>
              <span className={styles.highlight}>{ABOUT_HERO_HEADING_HIGHLIGHT}</span>
              <span>{ABOUT_HERO_HEADING_SUFFIX}</span>
            </Typography.Title>
            <Typography.Paragraph className={styles.description}>
              {ABOUT_HERO_DESCRIPTION}
            </Typography.Paragraph>
          </div>
        </Col>
        <Col xs={24} lg={10}>
          <div className={styles.visualBlock}>
            <div className={styles.imageFrame}>
              <img src={sonaImage} alt="Portrait of Sona" className={styles.image} />
            </div>
            <div className={styles.actions}>
              <Button
                type="primary"
                shape="round"
                className={styles.actionPrimary}
                icon={<FileImageOutlined />}
                aria-label="Open gallery"
              />
              <Button
                shape="round"
                className={styles.actionSecondary}
                icon={<AudioOutlined />}
                aria-label="Start voice introduction"
              />
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};
