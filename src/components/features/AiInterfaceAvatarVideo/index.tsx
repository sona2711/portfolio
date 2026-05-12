import { Button, Form, Input, Typography } from 'antd'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import type { AiInterfaceAvatarVideoFormValues } from './types'
import {
  CREATE_VIDEO_LABEL,
  DEMO_VIDEO_URL,
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
  UI_ONLY_COMPLETE_MESSAGE,
  VIDEO_PANEL_TITLE,
} from './consts'
import styles from './styles.module.css'
import { UI_SUBMIT_DELAY_MS, getSourceImageUrlFieldError } from './utils'

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
  const [isUiSubmitting, setIsUiSubmitting] = useState(false)
  const [uiCompleteMessage, setUiCompleteMessage] = useState<string | null>(null)
  const submitTimerRef = useRef<ReturnType<typeof window.setTimeout> | null>(null)

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

  useEffect(() => {
    return () => {
      if (submitTimerRef.current !== null) {
        window.clearTimeout(submitTimerRef.current)
      }
    }
  }, [])

  const handleValuesChange = (
    changed: Partial<AiInterfaceAvatarVideoFormValues>,
    all: AiInterfaceAvatarVideoFormValues,
  ) => {
    if ('sourceUrl' in changed) {
      syncPreviewFromUrl(all.sourceUrl ?? '')
      setUiCompleteMessage(null)
    }
    if ('script' in changed) {
      setUiCompleteMessage(null)
    }
  }

  const handleCreateVideo = async () => {
    try {
      await form.validateFields()
    } catch {
      return
    }

    if (submitTimerRef.current !== null) {
      window.clearTimeout(submitTimerRef.current)
    }

    setUiCompleteMessage(null)
    setIsUiSubmitting(true)
    submitTimerRef.current = window.setTimeout(() => {
      setIsUiSubmitting(false)
      setUiCompleteMessage(UI_ONLY_COMPLETE_MESSAGE)
      submitTimerRef.current = null
    }, UI_SUBMIT_DELAY_MS)
  }

  const handleReset = () => {
    if (submitTimerRef.current !== null) {
      window.clearTimeout(submitTimerRef.current)
      submitTimerRef.current = null
    }
    form.resetFields()
    setPreviewSrc(null)
    setPreviewBroken(false)
    setIsUiSubmitting(false)
    setUiCompleteMessage(null)
  }

  const demoVideoSrc = DEMO_VIDEO_URL.trim()
  const hasDemoVideo = demoVideoSrc.length > 0
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
              loading={isUiSubmitting}
            >
              {CREATE_VIDEO_LABEL}
            </Button>
            <Button htmlType="button" className={styles.secondaryButton} onClick={handleReset}>
              {RESET_LABEL}
            </Button>
          </div>
        </Form>

        <p className={styles.statusLine}>{STATUS_HELPER}</p>
      </div>

      <div className={styles.resultCard}>
        <Typography.Text strong className={styles.resultTitle}>
          {RESULT_TITLE}
        </Typography.Text>
        <div className={styles.videoShell}>
          {hasDemoVideo ? (
            <video className={styles.video} controls src={demoVideoSrc} preload="metadata" />
          ) : (
            <div className={styles.videoPlaceholder} role="status" aria-live="polite">
              {isUiSubmitting ? (
                <>
                  <div className={styles.spinner} aria-hidden />
                  <span>Preparing preview…</span>
                </>
              ) : null}
              {!isUiSubmitting && uiCompleteMessage ? <span>{uiCompleteMessage}</span> : null}
              {!isUiSubmitting && !uiCompleteMessage ? (
                <span>The rendered video appears here when ready.</span>
              ) : null}
            </div>
          )}
        </div>
        {hasDemoVideo ? (
          <a
            className={styles.resultLink}
            href={demoVideoSrc}
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
