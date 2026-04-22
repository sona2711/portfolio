import { Col, Row, Typography } from 'antd'
import { ExpertiseCard } from '../../_shared/ExpertiseCard'
import { SectionHeader } from '../../_shared/SectionHeader'
import styles from './styles.module.css'
import type { HomeExpertiseProps } from './types'

export const HomeExpertise = ({ items }: HomeExpertiseProps) => {
  return (
    <section className={styles.section}>
      <SectionHeader title="Experience & Expertise" />
      <Typography.Paragraph className={styles.description}>Bridging the gap between aesthetic design and functional
      code.</Typography.Paragraph>
      <Row gutter={[16, 16]}>
        {items.map((item) => (
          <Col key={item.title} xs={24} md={8}>
            <ExpertiseCard title={item.title} description={item.description} icon={item.icon} />
          </Col>
        ))}
      </Row>
    </section>
  )
}
