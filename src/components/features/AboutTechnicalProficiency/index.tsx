import { Col, Progress, Row, Tag, Typography } from "antd";
import {
  LANGUAGE_LEVEL_ITEMS,
  PRIMARY_TAGS,
  SECONDARY_TAGS,
  SKILL_PROGRESS_ITEMS,
  TECHNICAL_PROFICIENCY_DESCRIPTION,
  TECHNICAL_PROFICIENCY_TITLE,
  TECHNICAL_PROFICIENCY_IMAGE
} from "./consts";
import styles from "./styles.module.css";
import type { AboutTechnicalProficiencyProps } from "./types";

export const AboutTechnicalProficiency = (props: AboutTechnicalProficiencyProps) => {
  void props;

  return (
    <section className={styles.section}>
      <Typography.Title level={2} className={styles.title}>
        {TECHNICAL_PROFICIENCY_TITLE}
      </Typography.Title>
      <Typography.Paragraph className={styles.description}>
        {TECHNICAL_PROFICIENCY_DESCRIPTION}
      </Typography.Paragraph>

      <Row gutter={[28, 22]} align="middle" className={styles.contentGrid}>
        <Col xs={24} lg={11}>
          <img src={TECHNICAL_PROFICIENCY_IMAGE} alt="Technical Proficiency" className={styles.technicalProficiencyImage} />
        </Col>

        <Col xs={24} lg={13}>
          <div className={styles.skillsWrap}>
            {SKILL_PROGRESS_ITEMS.map((skill) => (
              <div key={skill.label} className={styles.skillRow}>
                <div className={styles.skillHeader}>
                  <Typography.Text className={styles.skillLabel}>{skill.label}</Typography.Text>
                  <Typography.Text className={styles.skillPercent}>
                    {skill.percent}%
                  </Typography.Text>
                </div>
                <Progress
                  percent={skill.percent}
                  showInfo={false}
                  strokeColor="#ae7416"
                  trailColor="#e5e1d8"
                  size={["100%", 4]}
                  className={styles.skillProgress}
                />
              </div>
            ))}

            <div className={styles.tagsWrap}>
              {PRIMARY_TAGS.map((tag) => (
                <Tag key={tag} className={styles.primaryTag}>
                  {tag}
                </Tag>
              ))}
              {SECONDARY_TAGS.map((tag) => (
                <Tag key={tag} className={styles.secondaryTag}>
                  {tag}
                </Tag>
              ))}
            </div>

            <div className={styles.languagesWrap}>
              <Typography.Title level={5} className={styles.languageTitle}>
                LANGUAGES
              </Typography.Title>
              <div className={styles.languageList}>
                {LANGUAGE_LEVEL_ITEMS.map((item) => (
                  <Typography.Text key={item.language} className={styles.languageItem}>
                    <span className={styles.languageName}>{item.language}:</span> {item.level}
                  </Typography.Text>
                ))}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};
