import { Button, Col, Form, Input, Row } from 'antd'
import { useTranslation } from 'react-i18next'
import styles from './styles.module.css'
import type { ContactFormCardProps } from './types'

export const ContactFormCard = (props: ContactFormCardProps) => {
  void props
  const { t } = useTranslation('contact')

  return (
    <div className={styles.card}>
      <Form layout="vertical" requiredMark={false}>
        <Row gutter={[12, 0]}>
          <Col xs={24} md={12}>
            <Form.Item label={t('form.labels.name')} className={styles.fieldLabel}>
              <Input placeholder={t('form.placeholders.name')} className={styles.input} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label={t('form.labels.email')} className={styles.fieldLabel}>
              <Input placeholder={t('form.placeholders.email')} className={styles.input} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label={t('form.labels.subject')} className={styles.fieldLabel}>
          <Input placeholder={t('form.placeholders.subject')} className={styles.input} />
        </Form.Item>

        <Form.Item label={t('form.labels.message')} className={styles.fieldLabel}>
          <Input.TextArea
            placeholder={t('form.placeholders.message')}
            className={styles.textArea}
            rows={5}
          />
        </Form.Item>

        <Button type="primary" className={styles.submitButton}>
          {t('submitLabel')}
        </Button>
      </Form>
    </div>
  )
}
