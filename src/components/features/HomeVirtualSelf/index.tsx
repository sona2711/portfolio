import { SendOutlined, RobotOutlined } from '@ant-design/icons'
import { Card, Col, Input, Row, Space, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { generateText } from '@/api/googleGenAI'
import { MarkdownBody } from '@/components/_shared/MarkdownBody'
import { buildCVProfileMarkdown } from '@/data/cvProfileMarkdown'
import { useCVContent } from '@/hooks/useCVContent'
import { SectionHeader } from '../../_shared/SectionHeader'
import { CHAT_MAX_WORDS, CHAT_SYSTEM_PROMPT } from './consts'
import type { VirtualChatMessage } from './types'
import { clampAssistantAnswer, sanitizeAssistantVoice } from './utils'
import styles from './styles.module.css'

export const HomeVirtualSelf = ({ video }: { video: string }) => {
  const { t } = useTranslation('home')
  const { t: tCommon } = useTranslation('common')
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [conversationMessages, setConversationMessages] = useState<VirtualChatMessage[]>([])
  const { sections } = useCVContent()

  const welcomeMessage = useMemo<VirtualChatMessage>(
    () => ({
      id: 'assistant-welcome',
      text: t('virtualSelf.chat.welcome'),
      variant: 'neutral',
      role: 'assistant',
    }),
    [t],
  )

  const displayMessages = useMemo(
    () => [welcomeMessage, ...conversationMessages],
    [welcomeMessage, conversationMessages],
  )

  const cvProfileMarkdown = useMemo(
    () => buildCVProfileMarkdown(sections),
    [sections],
  )

  const sendMessage = async () => {
    const question = inputValue.trim()
    if (!question || isLoading) {
      return
    }

    const userMessage: VirtualChatMessage = {
      id: `user-${Date.now()}`,
      text: question,
      variant: 'accent',
      role: 'user',
    }

    setConversationMessages((previousMessages) => [...previousMessages, userMessage])
    setInputValue('')
    setIsLoading(true)

    const chatErrorMessage = t('virtualSelf.chat.error')

    try {
      const prompt = `${CHAT_SYSTEM_PROMPT}

CV context:
${cvProfileMarkdown}

Visitor question:
${question}`
      const answer = await generateText(prompt)
      const sanitizedAnswer = sanitizeAssistantVoice(answer.trim())
      const shortAnswer = clampAssistantAnswer(sanitizedAnswer, CHAT_MAX_WORDS)

      setConversationMessages((previousMessages) => [
        ...previousMessages,
        {
          id: `assistant-${Date.now()}`,
          text: shortAnswer || chatErrorMessage,
          variant: 'neutral',
          role: 'assistant',
        },
      ])
    } catch {
      setConversationMessages((previousMessages) => [
        ...previousMessages,
        {
          id: `assistant-error-${Date.now()}`,
          text: chatErrorMessage,
          variant: 'neutral',
          role: 'assistant',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className={styles.section}>
      <SectionHeader title={t('virtualSelf.sectionTitle')} />
      <Typography.Paragraph className={styles.sectionSubtitle}>
        {t('virtualSelf.sectionSubtitle')}
      </Typography.Paragraph>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={10}>
          <div className={styles.videoWrap}>
            <video className={styles.video} controls preload="metadata">
              <source src={video} type="video/mp4" />
            </video>
          </div>
        </Col>
        <Col xs={24} md={14}>
          <Card className={styles.chatCard}>
            <div className={styles.chatHeader}>
              <div className={styles.chatIconWrap}>
                <RobotOutlined />
              </div>
              <div>
                <Typography.Text strong className={styles.chatTitle}>
                  {t('virtualSelf.chat.title')}
                </Typography.Text>
                <Typography.Text className={styles.chatStatus}>
                  {t('virtualSelf.chat.status')}
                </Typography.Text>
              </div>
            </div>
            <Space orientation="vertical" size={12} className={styles.chatBody}>
              {displayMessages.map((message) => (
                <div
                  key={message.id}
                  className={
                    message.variant === 'accent'
                      ? styles.chatBubbleAccent
                      : styles.chatBubble
                  }
                >
                  {message.role === 'assistant' ? (
                    <MarkdownBody markdown={message.text} />
                  ) : (
                    message.text
                  )}
                </div>
              ))}
              {isLoading ? (
                <div className={styles.chatBubble}>{t('virtualSelf.chat.loading')}</div>
              ) : null}
            </Space>
            <div className={styles.chatInput}>
              <Input
                variant="borderless"
                placeholder={t('virtualSelf.chat.inputPlaceholder')}
                className={styles.chatInputField}
                aria-label={tCommon('aria.message')}
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onPressEnter={sendMessage}
                disabled={isLoading}
              />
              <button
                type="button"
                className={styles.sendButton}
                aria-label={tCommon('aria.sendMessage')}
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading}
              >
                <SendOutlined />
              </button>
            </div>
          </Card>
        </Col>
      </Row>
    </section>
  )
}
