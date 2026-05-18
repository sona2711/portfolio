import { AudioOutlined, FileImageOutlined } from '@ant-design/icons'
import { Button, Col, Row, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import sonaImage from '../../../assets/images/Sona_About.png'
import styles from './styles.module.css'
import type { AboutHeroProps } from './types'

export const AboutHero = (props: AboutHeroProps) => {
  void props
  const { t } = useTranslation('about')

  return (
    <section className={styles.section}>
      <Row gutter={[40, 40]} align="middle">
        <Col xs={24} lg={14}>
          <div className={styles.content}>
            <Typography.Text className={styles.label}>{t('hero.label')}</Typography.Text>
            <Typography.Title level={1} className={styles.heading}>
              <span>{t('hero.heading.primary')}</span>
              <span className={styles.highlight}>{t('hero.heading.highlight')}</span>
              <span>{t('hero.heading.suffix')}</span>
            </Typography.Title>
            <Typography.Paragraph className={styles.description}>
              {t('hero.description')}
            </Typography.Paragraph>
          </div>
        </Col>
        <Col xs={24} lg={10}>
          <div className={styles.visualBlock}>
            <div className={styles.imageFrame}>
              <img src={sonaImage} alt={t('hero.imageAlt')} className={styles.image} />
            </div>
            <div className={styles.actions}>
              <Button
                type="primary"
                shape="round"
                className={styles.actionPrimary}
                icon={<FileImageOutlined />}
                aria-label={t('hero.aria.openGallery')}
              />
              <Button
                shape="round"
                className={styles.actionSecondary}
                icon={<AudioOutlined />}
                aria-label={t('hero.aria.voiceIntro')}
              />
            </div>
          </div>
        </Col>
      </Row>
    </section>
  )
}
