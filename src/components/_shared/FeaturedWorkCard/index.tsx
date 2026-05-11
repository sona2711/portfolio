import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Tag, Typography } from "antd";
import { FEATURED_WORK_CARD_EXTERNAL_LINK_REL } from "./consts";
import styles from "./styles.module.css";
import type { FeaturedWorkCardProps } from "./types";

export const FeaturedWorkCard = ({
  item,
  imageDirection = "right",
}: FeaturedWorkCardProps) => {
  const rowClassName =
    imageDirection === "left"
      ? styles.cardRow
      : `${styles.cardRow} ${styles.cardRowReverse}`;

  return (
    <Card className={styles.card}>
      <Row gutter={[16, 16]} align="middle" className={rowClassName}>
        <Col xs={24} md={12} className={styles.textFirst}>
          <Space orientation="vertical" size={8} className={styles.textStack}>
            <Typography.Text className={styles.meta}>{item.meta}</Typography.Text>
            <Typography.Title level={4} className={styles.title}>
              {item.title}
            </Typography.Title>
            <Typography.Paragraph className={styles.description}>
              {item.description}
            </Typography.Paragraph>
            <div className={styles.footerRow}>
              <Space size={6} wrap className={styles.tagGroup}>
                {item.tags.map((tag) => (
                  <Tag key={tag} className={styles.tag}>
                    {tag}
                  </Tag>
                ))}
              </Space>
              <Button
                type="link"
                className={styles.linkButton}
                href={item.url}
                target="_blank"
                rel={FEATURED_WORK_CARD_EXTERNAL_LINK_REL}
              >
                {item.ctaLabel} <ArrowRightOutlined />
              </Button>
            </div>
          </Space>
        </Col>
        <Col xs={24} md={12}>
            <div className={styles.previewImageWrap}>
              <img
                src={item.image}
                alt={item.title}
                className={styles.previewImage}
              />
            </div>
        </Col>
      </Row>
    </Card>
  );
};
