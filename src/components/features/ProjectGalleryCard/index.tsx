import { GithubOutlined, LinkOutlined } from '@ant-design/icons'
import { Button, Space, Tag, Typography } from 'antd'
import {
  PROJECT_GALLERY_CARD_EXTERNAL_LINK_REL,
  PROJECT_GALLERY_CARD_LIVE_LABEL,
  PROJECT_GALLERY_CARD_REPO_LABEL,
} from './consts'
import styles from './styles.module.css'
import type { ProjectGalleryCardProps } from './types'

export const ProjectGalleryCard = ({ item, layoutIndex }: ProjectGalleryCardProps) => {
  const cellClassName =
    layoutIndex % 2 === 1 ? `${styles.cell} ${styles.cellStagger}` : styles.cell

  return (
    <article className={cellClassName} aria-label={item.title}>
      <div className={styles.imageWrap}>
        <img src={item.image} alt="" className={styles.image} />
      </div>
      <div className={styles.body}>
        <Space size={6} wrap className={styles.tagRow}>
          {item.tags.map((tag) => (
            <Tag key={tag} className={styles.tag}>
              {tag}
            </Tag>
          ))}
        </Space>
        <Typography.Title level={4} className={styles.title}>
          {item.title}
        </Typography.Title>
        <Typography.Paragraph className={styles.description}>{item.description}</Typography.Paragraph>
        <div className={styles.actions}>
          <Button
            type="text"
            className={styles.iconButton}
            href={item.liveUrl}
            target="_blank"
            rel={PROJECT_GALLERY_CARD_EXTERNAL_LINK_REL}
            icon={<LinkOutlined />}
            aria-label={PROJECT_GALLERY_CARD_LIVE_LABEL}
          />
          {item.repoUrl ? (
            <Button
              type="text"
              className={styles.iconButton}
              href={item.repoUrl}
              target="_blank"
              rel={PROJECT_GALLERY_CARD_EXTERNAL_LINK_REL}
              icon={<GithubOutlined />}
              aria-label={PROJECT_GALLERY_CARD_REPO_LABEL}
            />
          ) : null}
        </div>
      </div>
    </article>
  )
}
