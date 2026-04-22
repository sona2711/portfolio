import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Tag, Typography } from "antd";
import styles from "./styles.module.css";
import type { FeaturedWorkCardProps } from "./types";

export const FeaturedWorkCard = ({
  item,
  imageDirection = "right",
}: FeaturedWorkCardProps) => {
  const isAccent = item.previewVariant === "accent";
  const rowClassName =
    imageDirection === "left" ? styles.cardRow : `${styles.cardRow} ${styles.cardRowReverse}`;

  return (
    <Card className={styles.card}>
      <Row gutter={[24, 24]} align="middle" className={rowClassName}>
        <Col
          xs={24}
          md={imageDirection === "left" ? 9 : 15}
          className={styles.textFirst}
        >
          <Space orientation="vertical" size={14}>
            <Typography.Text className={styles.meta}>
              {item.meta}
            </Typography.Text>
            <Typography.Title level={4} className={styles.title}>
              {item.title}
            </Typography.Title>
            <Typography.Paragraph className={styles.description}>
              {item.description}
            </Typography.Paragraph>
            <Space size={8} wrap>
              {item.tags.map((tag) => (
                <Tag key={tag} className={styles.tag}>
                  {tag}
                </Tag>
              ))}
            </Space>
            <Button type="link" className={styles.linkButton}>
              {item.ctaLabel} <ArrowRightOutlined />
            </Button>
          </Space>
        </Col>
        <Col xs={24} md={imageDirection === "left" ? 15 : 9}>
          <div className={isAccent ? styles.previewAccent : styles.previewDark}>
            <div className={styles.previewImageWrap}>
              <img src={item.image} alt={item.title} className={styles.previewImage} />
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
};
