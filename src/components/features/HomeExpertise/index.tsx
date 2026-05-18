import { Col, Row, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { ExpertiseCard } from '../../_shared/ExpertiseCard'
import { SectionHeader } from '../../_shared/SectionHeader'
import styles from './styles.module.css'
import type { HomeExpertiseProps } from './types'

export const HomeExpertise = ({ items }: HomeExpertiseProps) => {
  const { t } = useTranslation('home')

  return (
    <section className={styles.section}>
      <SectionHeader title={t('expertise.sectionTitle')} />
      <Typography.Paragraph className={styles.description}>
        {t('expertise.description')}
      </Typography.Paragraph>
      <Row gutter={[16, 16]}>
        {items.map((item) => (
          <Col key={item.key} xs={24} md={8}>
            <ExpertiseCard
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          </Col>
        ))}
      </Row>
    </section>
  )
}
