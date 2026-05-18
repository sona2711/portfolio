import { ReadOutlined, RocketOutlined } from '@ant-design/icons'
import { Col, Row, Typography } from 'antd'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { EDUCATION_ITEM_KEYS, EXPERIENCE_ITEM_DEFS } from './consts'
import styles from './styles.module.css'
import type { AboutEducationProps } from './types'

export const AboutEducation = (props: AboutEducationProps) => {
  void props
  const { t } = useTranslation('about')

  const educationItems = useMemo(
    () =>
      EDUCATION_ITEM_KEYS.map((key) => ({
        key,
        title: t(`education.items.${key}.title`),
        subtitle: t(`education.items.${key}.subtitle`),
        period: t(`education.items.${key}.period`),
      })),
    [t],
  )

  const experienceItems = useMemo(
    () =>
      EXPERIENCE_ITEM_DEFS.map((item) => ({
        key: item.key,
        period: t(`experience.items.${item.key}.period`),
        title: t(`experience.items.${item.key}.title`),
        description: t(`experience.items.${item.key}.description`),
        isCurrent: item.isCurrent,
      })),
    [t],
  )

  return (
    <section className={styles.section}>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <article className={styles.educationCard}>
            <Typography.Title level={4} className={styles.cardHeading}>
              <ReadOutlined className={styles.headingIcon} />
              {t('education.title')}
            </Typography.Title>

            {educationItems.map((item, index) => (
              <div
                key={item.key}
                className={
                  index < educationItems.length - 1 ? styles.eduItem : styles.eduItemLast
                }
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
                {t('experience.title')}
              </Typography.Title>
            </div>

            <div className={styles.experienceList}>
              {experienceItems.map((item) => (
                <div key={item.key} className={styles.experienceItem}>
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
  )
}
