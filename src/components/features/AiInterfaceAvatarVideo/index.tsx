import { Button, Form, Input, Typography } from 'antd'
import { useCallback, useId, useState } from 'react'
import { createTalk, pollTalkUntilTerminal } from '@/api/generateVideo'
import type { AiInterfaceAvatarVideoFormValues } from './types'
import {
  CREATE_VIDEO_LABEL,
  DEMO_VIDEO_URL,
  GENERATION_STATUS_PREFIX,
  MISSING_DID_CONFIG_MESSAGE,
  OPEN_VIDEO_LINK_LABEL,
  PREVIEW_LABEL,
  PREVIEW_PLACEHOLDER_ALT,
  RESET_LABEL,
  RESULT_TITLE,
  SCRIPT_LABEL,
  SCRIPT_PLACEHOLDER,
  SOURCE_URL_HELPER,
  SOURCE_URL_LABEL,
  SOURCE_URL_PLACEHOLDER,
  STATUS_HELPER,
  VIDEO_PANEL_TITLE,
} from './consts'
import styles from './styles.module.css'
import { getSourceImageUrlFieldError } from './utils'

const initialValues: AiInterfaceAvatarVideoFormValues = {
  sourceUrl: '',
  script: '',
}

export const AiInterfaceAvatarVideo = () => {
  const formId = useId()
  const sourceFieldId = `${formId}-source-url`
  const scriptFieldId = `${formId}-script`
  const [form] = Form.useForm<AiInterfaceAvatarVideoFormValues>()
  const [previewSrc, setPreviewSrc] = useState<string | null>(null)
  const [previewBroken, setPreviewBroken] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resultVideoUrl, setResultVideoUrl] = useState<string | null>(null)
  const [generationError, setGenerationError] = useState<string | null>(null)
  const [pollStatus, setPollStatus] = useState<string | null>(null)

  const syncPreviewFromUrl = useCallback((raw: string) => {
    const err = getSourceImageUrlFieldError(raw)
    if (err) {
      setPreviewSrc(null)
      setPreviewBroken(false)
      return
    }
    setPreviewSrc(raw.trim())
    setPreviewBroken(false)
  }, [])

  const handleValuesChange = (
    changed: Partial<AiInterfaceAvatarVideoFormValues>,
    all: AiInterfaceAvatarVideoFormValues,
  ) => {
    if ('sourceUrl' in changed || 'script' in changed) {
      setGenerationError(null)
      setPollStatus(null)
      setResultVideoUrl(null)
    }
    if ('sourceUrl' in changed) {
      syncPreviewFromUrl(all.sourceUrl ?? '')
    }
  }

  const handleCreateVideo = async () => {
    try {
      await form.validateFields()
    } catch {
      return
    }

    const apiKey = import.meta.env.VITE_DID_API_KEY
    if (typeof apiKey !== 'string' || !apiKey.trim()) {
      setGenerationError(MISSING_DID_CONFIG_MESSAGE)
      setPollStatus(null)
      setResultVideoUrl(null)
      return
    }

    const { sourceUrl, script } = form.getFieldsValue()
    const trimmedSource = sourceUrl.trim()
    const trimmedScript = script.trim()

    setGenerationError(null)
    setPollStatus(null)
    setResultVideoUrl(null)
    setIsSubmitting(true)

    try {
      const created = await createTalk(trimmedSource, trimmedScript)
      if (!created.ok) {
        setGenerationError(created.error)
        return
      }

      const finished = await pollTalkUntilTerminal(created.id, (status) => {
        setPollStatus(status)
      })
      setResultVideoUrl(finished.videoUrl)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Video generation failed.'
      setGenerationError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    form.resetFields()
    setPreviewSrc(null)
    setPreviewBroken(false)
    setIsSubmitting(false)
    setResultVideoUrl(null)
    setGenerationError(null)
    setPollStatus(null)
  }

  const demoVideoSrc = DEMO_VIDEO_URL.trim()
  const resolvedVideoUrl = (resultVideoUrl ?? '').trim() || demoVideoSrc
  const hasVideo = resolvedVideoUrl.length > 0
  const showPreviewImage = Boolean(previewSrc) && !previewBroken

  return (
    <div className={styles.page}>
      <Typography.Title level={4} className={styles.pageTitle}>
        {VIDEO_PANEL_TITLE}
      </Typography.Title>
      <div className={styles.card}>
        <Form<AiInterfaceAvatarVideoFormValues>
          form={form}
          layout="vertical"
          requiredMark={false}
          initialValues={initialValues}
          onValuesChange={handleValuesChange}
          className={styles.form}
        >
          <Form.Item
            className={styles.formItem}
            name="sourceUrl"
            label={
              <span className={styles.labelRow}>
                <span className={styles.requiredMark} aria-hidden>
                  *
                </span>
                <span>{SOURCE_URL_LABEL}</span>
              </span>
            }
            rules={[
              {
                validator: async (_, value) => {
                  const message = getSourceImageUrlFieldError(String(value ?? ''))
                  if (message) {
                    throw new Error(message)
                  }
                },
              },
            ]}
            extra={<p className={styles.helper}>{SOURCE_URL_HELPER}</p>}
          >
            <Input
              id={sourceFieldId}
              className={styles.input}
              placeholder={SOURCE_URL_PLACEHOLDER}
              autoComplete="off"
            />
          </Form.Item>

          <div className={styles.fieldBlock}>
            <p className={styles.previewLabel}>{PREVIEW_LABEL}</p>
            <div className={styles.previewFrame}>
              {showPreviewImage ? (
                <img
                  src={previewSrc ?? undefined}
                  alt=""
                  className={styles.previewImage}
                  onError={() => {
                    setPreviewBroken(true)
                  }}
                  onLoad={() => {
                    setPreviewBroken(false)
                  }}
                />
              ) : null}
              {!showPreviewImage ? (
                <div className={styles.previewPlaceholder}>{PREVIEW_PLACEHOLDER_ALT}</div>
              ) : null}
            </div>
          </div>

          <Form.Item
            className={styles.formItem}
            name="script"
            label={
              <span className={styles.labelRow}>
                <span className={styles.requiredMark} aria-hidden>
                  *
                </span>
                <span>{SCRIPT_LABEL}</span>
              </span>
            }
            rules={[
              { required: true, message: 'This field is required' },
              { whitespace: true, message: 'Enter what the avatar should say' },
            ]}
          >
            <Input.TextArea
              id={scriptFieldId}
              className={styles.textarea}
              placeholder={SCRIPT_PLACEHOLDER}
              autoSize={{ minRows: 4, maxRows: 10 }}
            />
          </Form.Item>

          <div className={styles.actions}>
            <Button
              type="primary"
              className={styles.primaryButton}
              onClick={handleCreateVideo}
              loading={isSubmitting}
            >
              {CREATE_VIDEO_LABEL}
            </Button>
            <Button htmlType="button" className={styles.secondaryButton} onClick={handleReset}>
              {RESET_LABEL}
            </Button>
          </div>
        </Form>

        <p className={styles.statusLine}>{STATUS_HELPER}</p>
        {pollStatus ? (
          <p className={styles.pollStatus}>
            {GENERATION_STATUS_PREFIX} {pollStatus}
          </p>
        ) : null}
      </div>

      <div className={styles.resultCard}>
        <Typography.Text strong className={styles.resultTitle}>
          {RESULT_TITLE}
        </Typography.Text>
        {generationError ? (
          <p className={styles.resultError} role="alert">
            {generationError}
          </p>
        ) : null}
        <div className={styles.videoShell}>
          {hasVideo ? (
            <video
              className={styles.video}
              controls
              src={resolvedVideoUrl}
              preload="metadata"
              key={resolvedVideoUrl}
            />
          ) : (
            <div className={styles.videoPlaceholder} role="status" aria-live="polite">
              {isSubmitting ? (
                <>
                  <div className={styles.spinner} aria-hidden />
                  <span>Generating video…</span>
                </>
              ) : null}
              {!isSubmitting && !generationError ? (
                <span>The rendered video appears here when ready.</span>
              ) : null}
            </div>
          )}
        </div>
        {hasVideo ? (
          <a
            className={styles.resultLink}
            href={resolvedVideoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {OPEN_VIDEO_LINK_LABEL}
          </a>
        ) : (
          <span className={styles.resultLinkDisabled} aria-disabled="true">
            {OPEN_VIDEO_LINK_LABEL}
          </span>
        )}
      </div>
    </div>
  )
}
