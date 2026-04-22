import { Layout, Space, Typography } from 'antd'
import {
  FOOTER_BRAND_NAME,
  FOOTER_COPYRIGHT_LINE,
  FOOTER_LINKS,
} from './consts'
import styles from './styles.module.css'

export const LayoutFooter = () => {
  return (
    <Layout.Footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Typography.Text className={styles.brand}>{FOOTER_BRAND_NAME}</Typography.Text>
          <Typography.Text className={styles.tagline}>{FOOTER_COPYRIGHT_LINE}</Typography.Text>
        </div>
        <Space size={28} className={styles.links}>
          {FOOTER_LINKS.map((link) => (
            <Typography.Link
              key={link.label}
              href={link.href}
              target={link.isExternal ? '_blank' : undefined}
              rel={link.isExternal ? 'noreferrer' : undefined}
              className={styles.footerLink}
            >
              {link.label}
            </Typography.Link>
          ))}
        </Space>
      </div>
    </Layout.Footer>
  )
}
