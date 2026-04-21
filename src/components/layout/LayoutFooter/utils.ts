import { GithubOutlined, MailOutlined } from '@ant-design/icons'
import type { ComponentType } from 'react'

export const getFooterIcon = (label: string): ComponentType => {
  if (label === 'GitHub') {
    return GithubOutlined
  }

  return MailOutlined
}
