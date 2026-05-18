import { SendOutlined } from '@ant-design/icons'
import { Button, Input, Select, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { generateText } from '@/api/googleGenAI'
import { MarkdownBody } from '@/components/_shared/MarkdownBody'
import { setCVContent } from '@/data/CVContent'
import { buildCVProfileMarkdown } from '@/data/cvProfileMarkdown'
import { useCVContent } from '@/hooks/useCVContent'
import type { CVSectionKey } from '@/types/cvContent'
import { CV_SECTION_KEYS } from './consts'
import styles from './styles.module.css'

const PROMPT_INPUT_ID = 'ai-interface-dashboard-prompt'

export const AiInterfaceDashboard = () => {
  const { t } = useTranslation('admin')
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copyStatus, setCopyStatus] = useState('')
  const [section, setSection] = useState<CVSectionKey>('summary')
  const { sections } = useCVContent()
  const cvProfileMarkdown = buildCVProfileMarkdown(sections)

  const sectionOptions = useMemo(
    () =>
      CV_SECTION_KEYS.map((key) => ({
        value: key,
        label: t(`dashboard.sections.${key}`),
      })),
    [t],
  )

  const handleClick = async () => {
    if (!prompt.trim() || isLoading) {
      return
    }

    setIsLoading(true)
    try {
      const res = await generateText(prompt, { asMarkdown: true })
      setCVContent({
        sections: {
          ...sections,
          [section]: res ?? '',
        },
      })
    } catch (error) {
      const message =
        error instanceof Error ? error.message : t('dashboard.errors.generateFailed')
      setCVContent({ sections: { ...sections, [section]: message } })
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setPrompt('')
    setCopyStatus('')
  }

  const handleCopyCVMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(cvProfileMarkdown)
      setCopyStatus(t('dashboard.copySuccess'))
    } catch {
      setCopyStatus(t('dashboard.copyError'))
    }
  }

  return (
    <div className={styles.page}>
      <Typography.Title level={4} className={styles.title}>
        {t('dashboard.title')}
      </Typography.Title>
      <div>
        <Select
          value={section}
          onChange={setSection}
          className={styles.sectionSelect}
          options={sectionOptions}
        />
      </div>
      <section className={styles.shell}>
        <div className={styles.main}>
          <div className={styles.fieldGroup}>
            <label htmlFor={PROMPT_INPUT_ID} className={styles.sectionLabel}>
              {t('dashboard.labels.prompt')}
            </label>
            <Input.TextArea
              id={PROMPT_INPUT_ID}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t('dashboard.promptPlaceholder')}
              className={styles.promptField}
              autoSize={{ minRows: 5, maxRows: 12 }}
            />
          </div>

          <div className={styles.actions}>
            <Button
              type="primary"
              icon={<SendOutlined />}
              className={styles.sendButton}
              onClick={handleClick}
              loading={isLoading}
              disabled={!prompt.trim() || isLoading}
            >
              {t('dashboard.buttons.send')}
            </Button>
            <Button htmlType="button" className={styles.resetButton} onClick={handleReset}>
              {t('dashboard.buttons.reset')}
            </Button>
            <Button htmlType="button" className={styles.resetButton} onClick={handleCopyCVMarkdown}>
              {t('dashboard.copyCvMarkdown')}
            </Button>
          </div>
          {copyStatus ? (
            <Typography.Text className={styles.optionLabel}>{copyStatus}</Typography.Text>
          ) : null}

          <div className={styles.fieldGroup}>
            <Typography.Text strong className={styles.sectionLabel}>
              {t('dashboard.labels.response')}
            </Typography.Text>
            <div className={styles.responseBox} role="status" aria-live="polite">
              {sections[section] ? (
                <MarkdownBody markdown={sections[section]} />
              ) : (
                <span className={styles.responsePlaceholder}>
                  {t('dashboard.responsePlaceholder')}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
