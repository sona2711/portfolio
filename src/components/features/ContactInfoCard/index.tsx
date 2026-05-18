import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons'
import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import styles from './styles.module.css'
import type { ContactInfoCardProps, ContactInfoLabelKey } from './types'

const iconByLabelKey: Record<ContactInfoLabelKey, JSX.Element> = {
  email: <MailOutlined />,
  phone: <PhoneOutlined />,
  location: <EnvironmentOutlined />,
}

export const ContactInfoCard = ({ items }: ContactInfoCardProps) => {
  const { t } = useTranslation('contact')

  return (
    <div className={styles.aside}>
      <div className={styles.visualCard}>
        <div className={styles.visualBackdrop} />
      </div>
      <div className={styles.availabilityBadge}>
        {items.map((item) => (
          <div key={item.labelKey} className={styles.infoItem}>
            <span className={styles.infoIcon}>{iconByLabelKey[item.labelKey]}</span>
            <div>
              <Typography.Text className={styles.infoLabel}>
                {t(`info.labels.${item.labelKey}`)}
              </Typography.Text>
              <Typography.Paragraph className={styles.infoValue}>
                {t(`info.values.${item.labelKey}`)}
              </Typography.Paragraph>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
