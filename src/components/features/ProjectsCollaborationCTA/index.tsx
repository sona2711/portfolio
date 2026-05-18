import { Button, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import {
  PROJECTS_COLLABORATION_CV_DOWNLOAD_FILENAME,
  PROJECTS_COLLABORATION_CV_PATH,
} from './consts'
import styles from './styles.module.css'

export const ProjectsCollaborationCTA = () => {
  const navigate = useNavigate()
  const { t } = useTranslation('projects')
  const heading = t('collaborationCta.heading')

  return (
    <section className={styles.wrapper} aria-label={heading}>
      <div className={styles.inner}>
        <Typography.Title level={2} className={styles.title}>
          {heading}
        </Typography.Title>
        <Typography.Paragraph className={styles.body}>
          {t('collaborationCta.body')}
        </Typography.Paragraph>
        <div className={styles.actions}>
          <Button
            type="primary"
            className={styles.primaryButton}
            onClick={() => {
              navigate('/contact')
            }}
          >
            {t('collaborationCta.primaryButton')}
          </Button>
          <Button
            className={styles.secondaryButton}
            href={PROJECTS_COLLABORATION_CV_PATH}
            download={PROJECTS_COLLABORATION_CV_DOWNLOAD_FILENAME}
          >
            {t('collaborationCta.secondaryButton')}
          </Button>
        </div>
      </div>
    </section>
  )
}
