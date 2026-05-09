import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Flex, Typography } from "antd";
import styles from "./styles.module.css";
import type { ContactInfoCardProps, ContactInfoLabel } from "./types";

const iconByLabel: Record<ContactInfoLabel, JSX.Element> = {
  EMAIL: <MailOutlined />,
  PHONE: <PhoneOutlined />,
  LOCATION: <EnvironmentOutlined />,
};

export const ContactInfoCard = ({ cardTitle, items }: ContactInfoCardProps) => {
  return (
    <div className={styles.aside}>
      <div className={styles.visualCard}>
        <div className={styles.visualBackdrop} />
      </div>
      <div className={styles.availabilityBadge}>{cardTitle}</div>

      <Flex className={styles.infoList}>
      {items.map((item) => (
          <div key={item.label} className={styles.infoItem}>
            <span className={styles.infoIcon}>{iconByLabel[item.label]}</span>
            <div>
              <Typography.Text className={styles.infoLabel}>{item.label}</Typography.Text>
              <Typography.Paragraph className={styles.infoValue}>{item.value}</Typography.Paragraph>
            </div>
          </div>
        ))}
      </Flex>
    </div>
  );
};
