import { Col, Row, Typography } from "antd";
import { ContactFormCard } from "../ContactFormCard";
import { CONTACT_INFO_ITEMS } from "../ContactInfoCard/consts";
import { ContactInfoCard } from "../ContactInfoCard";
import {
  CONTACT_CARD_TITLE,
  CONTACT_DESCRIPTION,
  CONTACT_SOCIALS_LABEL,
  CONTACT_SUBMIT_LABEL,
  CONTACT_TITLE,
} from "./consts";
import type { ContactGetInTouchProps } from "./types";
import styles from "./styles.module.css";

export const ContactGetInTouch = (props: ContactGetInTouchProps) => {
  void props;

  return (
    <section className={styles.section}>
      <Typography.Title level={1} className={styles.title}>
        {CONTACT_TITLE}
      </Typography.Title>
      <Typography.Paragraph className={styles.description}>
        {CONTACT_DESCRIPTION}
      </Typography.Paragraph>

      <Row gutter={[24, 24]} className={styles.contentGrid}>
        <Col xs={24} lg={14}>
          <ContactFormCard submitLabel={CONTACT_SUBMIT_LABEL} />
        </Col>

        <Col xs={24} lg={10}>
          <ContactInfoCard
            cardTitle={CONTACT_CARD_TITLE}
            socialsLabel={CONTACT_SOCIALS_LABEL}
            items={CONTACT_INFO_ITEMS}
          />
        </Col>
      </Row>
    </section>
  );
};
