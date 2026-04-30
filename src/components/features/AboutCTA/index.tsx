import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { ABOUT_CTA_BUTTON_TEXT, ABOUT_CTA_DESCRIPTION, ABOUT_CTA_TITLE } from "./consts";
import styles from "./styles.module.css";
import type { AboutCTAProps } from "./types";

export const AboutCTA = (props: AboutCTAProps) => {
  void props;
  const navigate = useNavigate();

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <Typography.Title level={2} className={styles.title}>
          {ABOUT_CTA_TITLE}
        </Typography.Title>
        <Typography.Paragraph className={styles.description}>
          {ABOUT_CTA_DESCRIPTION}
        </Typography.Paragraph>
        <Button
          type="primary"
          className={styles.ctaButton}
          icon={<ArrowRightOutlined />}
          iconPosition="end"
          onClick={() => navigate("/contact")}
        >
          {ABOUT_CTA_BUTTON_TEXT}
        </Button>
      </div>
    </section>
  );
};
