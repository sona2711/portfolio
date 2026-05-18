import { Col, Progress, Row, Tag, Typography } from 'antd'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  LANGUAGE_LEVEL_KEYS,
  PRIMARY_TAGS,
  SECONDARY_TAGS,
  SKILL_PROGRESS_ITEMS,
  TECHNICAL_PROFICIENCY_IMAGE,
} from './consts'
import styles from './styles.module.css'
import type { AboutTechnicalProficiencyProps } from './types'

export const AboutTechnicalProficiency = (props: AboutTechnicalProficiencyProps) => {
  void props
  const { t } = useTranslation('about')

  const skillItems = useMemo(
    () =>
      SKILL_PROGRESS_ITEMS.map((skill) => ({
        key: skill.skillKey,
        label: t(`technicalProficiency.skills.${skill.skillKey}`),
        percent: skill.percent,
      })),
    [t],
  )

  const languageItems = useMemo(
    () =>
      LANGUAGE_LEVEL_KEYS.map((key) => ({
        key,
        language: t(`technicalProficiency.languageLevels.${key}.language`),
        level: t(`technicalProficiency.languageLevels.${key}.level`),
      })),
    [t],
  )

  return (
    <section className={styles.section}>
      <Typography.Title level={2} className={styles.title}>
        {t('technicalProficiency.title')}
      </Typography.Title>
      <Typography.Paragraph className={styles.description}>
        {t('technicalProficiency.description')}
      </Typography.Paragraph>

      <Row gutter={[28, 22]} align="middle" className={styles.contentGrid}>
        <Col xs={24} lg={11}>
          <img
            src={TECHNICAL_PROFICIENCY_IMAGE}
            alt={t('technicalProficiency.imageAlt')}
            className={styles.technicalProficiencyImage}
          />
        </Col>

        <Col xs={24} lg={13}>
          <div className={styles.skillsWrap}>
            {skillItems.map((skill) => (
              <div key={skill.key} className={styles.skillRow}>
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
                  railColor="#e5e1d8"
                  size={['100%', 4]}
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
                {t('technicalProficiency.languagesHeading')}
              </Typography.Title>
              <div className={styles.languageList}>
                {languageItems.map((item) => (
                  <Typography.Text key={item.key} className={styles.languageItem}>
                    <span className={styles.languageName}>{item.language}:</span> {item.level}
                  </Typography.Text>
                ))}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  )
}
