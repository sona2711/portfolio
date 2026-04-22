import { PlayCircleOutlined, SendOutlined, ToolOutlined } from '@ant-design/icons'
import { Card, Col, Input, Row, Space, Typography } from 'antd'
import { SectionHeader } from '../../_shared/SectionHeader'
import {
  CHAT_INPUT_PLACEHOLDER,
  CHAT_MESSAGES,
  CHAT_STATUS,
  CHAT_TITLE,
  VIDEO_SOURCE,
  VIDEO_SUBTITLE,
  VIDEO_TIMER,
  VIDEO_TITLE,
} from './consts'
import styles from './styles.module.css'

export const HomeVirtualSelf = () => {
  return (
    <section className={styles.section}>
      <SectionHeader title="Meet My Virtual Self" />
      <Typography.Paragraph className={styles.sectionSubtitle}>
        An interactive way to explore my background through AI.
      </Typography.Paragraph>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={14}>
          <div className={styles.videoWrap}>
            <video className={styles.video} controls preload="metadata">
              <source src={VIDEO_SOURCE} type="video/mp4" />
            </video>
            <div className={styles.videoOverlay}>
              <PlayCircleOutlined className={styles.playIcon} />
            </div>
            <div className={styles.videoFooter}>
              <Typography.Text className={styles.videoState}>AI SYNTHESIS ACTIVE</Typography.Text>
              <Typography.Text className={styles.videoTime}>{VIDEO_TIMER}</Typography.Text>
            </div>
          </div>
          <div className={styles.videoMeta}>
            <Typography.Paragraph className={styles.videoTitle}>
              {VIDEO_TITLE}
            </Typography.Paragraph>
            <Typography.Paragraph className={styles.videoSubtitle}>{VIDEO_SUBTITLE}</Typography.Paragraph>
          </div>
        </Col>
        <Col xs={24} md={10}>
          <Card className={styles.chatCard}>
            <div className={styles.chatHeader}>
              <div className={styles.chatIconWrap}>
                <ToolOutlined />
              </div>
              <div>
                <Typography.Text strong className={styles.chatTitle}>
                  {CHAT_TITLE}
                </Typography.Text>
                <Typography.Text className={styles.chatStatus}>{CHAT_STATUS}</Typography.Text>
              </div>
            </div>
            <Space orientation="vertical" size={12} className={styles.chatBody}>
              {CHAT_MESSAGES.map((message) => (
                <div
                  key={message.text}
                  className={message.variant === 'accent' ? styles.chatBubbleAccent : styles.chatBubble}
                >
                  {message.text}
                </div>
              ))}
            </Space>
            <div className={styles.chatInput}>
              <Input
                variant="borderless"
                placeholder={CHAT_INPUT_PLACEHOLDER}
                className={styles.chatInputField}
                aria-label="Message"
              />
              <button type="button" className={styles.sendButton} aria-label="Send message">
                <SendOutlined />
              </button>
            </div>
          </Card>
        </Col>
      </Row>
    </section>
  )
}
