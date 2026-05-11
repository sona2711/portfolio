import { Button, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
  PROJECTS_COLLABORATION_CTA_BODY,
  PROJECTS_COLLABORATION_CTA_HEADING,
  PROJECTS_COLLABORATION_CTA_PRIMARY_LABEL,
  PROJECTS_COLLABORATION_CTA_SECONDARY_LABEL,
  PROJECTS_COLLABORATION_CV_DOWNLOAD_FILENAME,
  PROJECTS_COLLABORATION_CV_PATH,
} from './consts'
import styles from './styles.module.css'

export const ProjectsCollaborationCTA = () => {
  const navigate = useNavigate()

  return (
    <section className={styles.wrapper} aria-label={PROJECTS_COLLABORATION_CTA_HEADING}>
      <div className={styles.inner}>
        <Typography.Title level={2} className={styles.title}>
          {PROJECTS_COLLABORATION_CTA_HEADING}
        </Typography.Title>
        <Typography.Paragraph className={styles.body}>{PROJECTS_COLLABORATION_CTA_BODY}</Typography.Paragraph>
        <div className={styles.actions}>
          <Button
            type="primary"
            className={styles.primaryButton}
            onClick={() => {
              navigate('/contact')
            }}
          >
            {PROJECTS_COLLABORATION_CTA_PRIMARY_LABEL}
          </Button>
          <Button
            className={styles.secondaryButton}
            href={PROJECTS_COLLABORATION_CV_PATH}
            download={PROJECTS_COLLABORATION_CV_DOWNLOAD_FILENAME}
          >
            {PROJECTS_COLLABORATION_CTA_SECONDARY_LABEL}
          </Button>
        </div>
      </div>
    </section>
  )
}
