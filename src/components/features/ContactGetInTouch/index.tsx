import { Col, Row, Typography } from 'antd'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ContactFormCard } from '../ContactFormCard'
import { CONTACT_INFO_LABEL_KEYS } from '../ContactInfoCard/consts'
import { ContactInfoCard } from '../ContactInfoCard'
import type { ContactGetInTouchProps } from './types'
import styles from './styles.module.css'

export const ContactGetInTouch = (props: ContactGetInTouchProps) => {
  void props
  const { t } = useTranslation('contact')

  const contactInfoItems = useMemo(
    () =>
      CONTACT_INFO_LABEL_KEYS.map((labelKey) => ({
        labelKey,
        value: t(`info.values.${labelKey}`),
      })),
    [t],
  )

  return (
    <section className={styles.section}>
      <Typography.Title level={1} className={styles.title}>
        {t('title')}
      </Typography.Title>
      <Typography.Paragraph className={styles.description}>
        {t('description')}
      </Typography.Paragraph>

      <Row gutter={[24, 24]} className={styles.contentGrid}>
        <Col xs={24} lg={14}>
          <ContactFormCard />
        </Col>

        <Col xs={24} lg={10}>
          <ContactInfoCard
            cardTitle={t('cardTitle')}
            socialsLabel={t('socialsLabel')}
            items={contactInfoItems}
          />
        </Col>
      </Row>
    </section>
  )
}
