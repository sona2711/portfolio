import { ClockCircleOutlined, ReadOutlined, RocketOutlined } from "@ant-design/icons";
import { Col, Row, Typography } from "antd";
import {
  EDUCATION_ITEMS,
  EDUCATION_TITLE,
  EXPERIENCE_ITEMS,
  EXPERIENCE_TITLE,
} from "./consts";
import styles from "./styles.module.css";
import type { AboutEducationProps } from "./types";

export const AboutEducation = (props: AboutEducationProps) => {
  void props;

  return (
    <section className={styles.section}>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <article className={styles.educationCard}>
            <Typography.Title level={4} className={styles.cardHeading}>
              <ReadOutlined className={styles.headingIcon} />
              {EDUCATION_TITLE}
            </Typography.Title>

            {EDUCATION_ITEMS.map((item, index) => (
              <div
                key={`${item.title}-${item.period}`}
                className={index < EDUCATION_ITEMS.length - 1 ? styles.eduItem : styles.eduItemLast}
              >
                <Typography.Title level={5} className={styles.itemTitle}>
                  {item.title}
                </Typography.Title>
                <Typography.Paragraph className={styles.itemSubtitle}>
                  {item.subtitle}
                </Typography.Paragraph>
                <Typography.Text className={styles.itemPeriod}>{item.period}</Typography.Text>
              </div>
            ))}
          </article>
        </Col>

        <Col xs={24} lg={16}>
          <article className={styles.experienceCard}>
            <div className={styles.experienceHeader}>
              <Typography.Title level={4} className={styles.cardHeading}>
                <RocketOutlined className={styles.headingIcon} />
                {EXPERIENCE_TITLE}
              </Typography.Title>
              <ClockCircleOutlined className={styles.watermarkIcon} />
            </div>

            <div className={styles.experienceList}>
              {EXPERIENCE_ITEMS.map((item) => (
                <div key={`${item.title}-${item.period}`} className={styles.experienceItem}>
                  <Typography.Text
                    className={item.isCurrent ? styles.periodCurrent : styles.periodDefault}
                  >
                    {item.period}
                  </Typography.Text>
                  <div className={styles.experienceContent}>
                    <Typography.Title level={5} className={styles.itemTitle}>
                      {item.title}
                    </Typography.Title>
                    <Typography.Paragraph className={styles.experienceDescription}>
                      {item.description}
                    </Typography.Paragraph>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </Col>
      </Row>
    </section>
  );
};
