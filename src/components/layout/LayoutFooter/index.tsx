import { Layout, Space, Typography } from 'antd'
import { FOOTER_LINKS } from './consts'
import styles from './styles.module.css'
import { getFooterIcon } from './utils'

export const LayoutFooter = () => {
  return (
    <Layout.Footer className={styles.footer}>
      <Space size="large">
        {FOOTER_LINKS.map((link) => {
          const Icon = getFooterIcon(link.label)

          return (
            <Typography.Link
              key={link.label}
              href={link.href}
              target={link.isExternal ? '_blank' : undefined}
              rel={link.isExternal ? 'noreferrer' : undefined}
            >
              <Icon /> {link.label}
            </Typography.Link>
          )
        })}
      </Space>
    </Layout.Footer>
  )
}
