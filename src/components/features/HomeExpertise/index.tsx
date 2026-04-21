import { Col, Row } from 'antd'
import { SectionHeader } from '../../_shared/SectionHeader'
import { ExpertiseCard } from '../ExpertiseCard'
import styles from './styles.module.css'
import type { HomeExpertiseProps } from './types'

export const HomeExpertise = ({ items }: HomeExpertiseProps) => {
  return (
    <section className={styles.section}>
      <SectionHeader title="Experience & Expertise" />
      <Row gutter={[16, 16]}>
        {items.map((item) => (
          <Col key={item.title} xs={24} md={8}>
            <ExpertiseCard title={item.title} description={item.description} />
          </Col>
        ))}
      </Row>
    </section>
  )
}
