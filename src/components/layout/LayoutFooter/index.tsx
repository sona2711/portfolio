import { Layout, Space, Typography } from 'antd'
import { FOOTER_COPYRIGHT, FOOTER_LINKS } from './consts'
import styles from './styles.module.css'

export const LayoutFooter = () => {
  return (
    <Layout.Footer className={styles.footer}>
      <Typography.Text className={styles.copyright}>{FOOTER_COPYRIGHT}</Typography.Text>
      <Space size={18}>
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
    </Layout.Footer>
  )
}
