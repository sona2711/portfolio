import { useNavigate } from "react-router-dom";
import { CodeOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Row, Space, Tag, Typography } from "antd";
import sonaImage from "../../../assets/images/R.jpg";
import { HERO_DESCRIPTION, HERO_LABEL, HERO_NAME } from "./consts";
import styles from "./styles.module.css";

export const HomeHero = () => {
  const navigate = useNavigate();
  const heroDescription = HERO_DESCRIPTION;

  return (
    <section className={styles.section}>
      <Tag variant="filled" className={styles.tag}>
        {HERO_LABEL}
      </Tag>
      <Row gutter={[64, 64]} align="middle">
        <Col xs={24} md={14}>
          <Space orientation="vertical" size={40} className={styles.textBlock}>
            <Typography.Title level={1} className={styles.title}>
              {HERO_NAME}
            </Typography.Title>
            <Typography.Paragraph className={styles.description}>
              {heroDescription}
            </Typography.Paragraph>
            <Space size={24} wrap>
              <Button
                type="primary"
                className={styles.darkButton}
                onClick={() => navigate("/projects")}
              >
                View Work
              </Button>
              <Button
                type="text"
                className={styles.lightButton}
                onClick={() => navigate("/contact")}
              >
                Hire Me
              </Button>
            </Space>
          </Space>
        </Col>
        <Col xs={24} md={10} lg={8}>
          <Flex justify="center" align="center" className={styles.portraitCard}>
              <img
                src={sonaImage}
                alt={HERO_NAME}
                className={styles.portraitImage}
              />
          </Flex>
          <Flex
            align="center"
            justify="center"
            className={styles.floatingAction}
          >
            <CodeOutlined />
          </Flex>
        </Col>
      </Row>
    </section>
  );
};
