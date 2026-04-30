import { Button, Col, Form, Input, Row } from "antd";
import {
  CONTACT_FORM_EMAIL_LABEL,
  CONTACT_FORM_EMAIL_PLACEHOLDER,
  CONTACT_FORM_MESSAGE_LABEL,
  CONTACT_FORM_MESSAGE_PLACEHOLDER,
  CONTACT_FORM_NAME_LABEL,
  CONTACT_FORM_NAME_PLACEHOLDER,
  CONTACT_FORM_SUBJECT_LABEL,
  CONTACT_FORM_SUBJECT_PLACEHOLDER,
} from "./consts";
import styles from "./styles.module.css";
import type { ContactFormCardProps } from "./types";

export const ContactFormCard = ({ submitLabel }: ContactFormCardProps) => {
  return (
    <div className={styles.card}>
      <Form layout="vertical" requiredMark={false}>
        <Row gutter={[12, 0]}>
          <Col xs={24} md={12}>
            <Form.Item label={CONTACT_FORM_NAME_LABEL} className={styles.fieldLabel}>
              <Input placeholder={CONTACT_FORM_NAME_PLACEHOLDER} className={styles.input} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label={CONTACT_FORM_EMAIL_LABEL} className={styles.fieldLabel}>
              <Input placeholder={CONTACT_FORM_EMAIL_PLACEHOLDER} className={styles.input} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label={CONTACT_FORM_SUBJECT_LABEL} className={styles.fieldLabel}>
          <Input placeholder={CONTACT_FORM_SUBJECT_PLACEHOLDER} className={styles.input} />
        </Form.Item>

        <Form.Item label={CONTACT_FORM_MESSAGE_LABEL} className={styles.fieldLabel}>
          <Input.TextArea
            placeholder={CONTACT_FORM_MESSAGE_PLACEHOLDER}
            className={styles.textArea}
            rows={5}
          />
        </Form.Item>

        <Button type="primary" className={styles.submitButton}>
          {submitLabel}
        </Button>
      </Form>
    </div>
  );
};
