import { Alert, Button, Form, Input, Select, Typography } from 'antd'
import { useCallback, useEffect, useId, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { createTalk, fetchTtsVoices, isDidApiClientConfigured, pollTalkUntilTerminal } from '@/api/generateVideo'
import type { VideoFormValues, AvatarVoiceOption } from './types'
import {
  DEFAULT_VOICE_OPTION_KEY,
  DEMO_VIDEO_URL,
  SOURCE_URL_PLACEHOLDER,
  VOICE_FALLBACK_PRESET_DEFS,
} from './consts'
import styles from './styles.module.css'
import {
  didVoiceToAvatarOption,
  findProviderForVoiceOptionKey,
  getSourceImageUrlFieldError,
} from './utils'

const initialValues: VideoFormValues = {
  sourceUrl: '',
  script: '',
  voiceOptionKey: DEFAULT_VOICE_OPTION_KEY,
}

const dedupeAvatarVoiceOptions = (options: AvatarVoiceOption[]): AvatarVoiceOption[] => {
  const seen = new Set<string>()
  const out: AvatarVoiceOption[] = []
  for (const option of options) {
    if (seen.has(option.optionKey)) {
      continue
    }
    seen.add(option.optionKey)
    out.push(option)
  }
  return out
}

export const AiInterfaceAvatarVideo = () => {
  const { t } = useTranslation('admin')
  const formId = useId()
  const sourceFieldId = `${formId}-source-url`
  const scriptFieldId = `${formId}-script`
  const voiceFieldId = `${formId}-voice`
  const [form] = Form.useForm<VideoFormValues>()

  const voiceFallbackPresets = useMemo<AvatarVoiceOption[]>(
    () =>
      VOICE_FALLBACK_PRESET_DEFS.map((preset) => ({
        optionKey: preset.optionKey,
        label: t(`avatarVideo.voicePresets.${preset.presetKey}`),
        provider: preset.provider,
      })),
    [t],
  )

  const [apiVoiceOptions, setApiVoiceOptions] = useState<AvatarVoiceOption[] | null>(null)
  const voiceOptions = apiVoiceOptions ?? voiceFallbackPresets
  const [voicesLoading, setVoicesLoading] = useState(false)
  const [voicesLoadError, setVoicesLoadError] = useState<string | null>(null)
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

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      if (!isDidApiClientConfigured()) {
        setVoicesLoadError(null)
        return
      }

      setVoicesLoading(true)
      setVoicesLoadError(null)

      const result = await fetchTtsVoices()
      if (cancelled) {
        return
      }

      if (result.ok && result.voices.length > 0) {
        const opts = dedupeAvatarVoiceOptions(result.voices.map(didVoiceToAvatarOption))
        setApiVoiceOptions(opts)
        form.setFieldsValue({ voiceOptionKey: opts[0]?.optionKey ?? DEFAULT_VOICE_OPTION_KEY })
        setVoicesLoadError(null)
      } else {
        const message = result.ok === false ? result.error : 'No voices returned.'
        setVoicesLoadError(message)
        setApiVoiceOptions(null)
        form.setFieldsValue({ voiceOptionKey: DEFAULT_VOICE_OPTION_KEY })
      }

      setVoicesLoading(false)
    }

    void run()

    return () => {
      cancelled = true
    }
  }, [form, voiceFallbackPresets])

  const handleValuesChange = (
    changed: Partial<VideoFormValues>,
    all: VideoFormValues,
  ) => {
    if ('sourceUrl' in changed || 'script' in changed || 'voiceOptionKey' in changed) {
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

    if (!isDidApiClientConfigured()) {
      setGenerationError(t('avatarVideo.missingConfig'))
      setPollStatus(null)
      setResultVideoUrl(null)
      return
    }

    const { sourceUrl, script, voiceOptionKey } = form.getFieldsValue()
    const trimmedSource = sourceUrl.trim()
    const trimmedScript = script.trim()
    const provider = findProviderForVoiceOptionKey(voiceOptionKey, voiceOptions)
    if (!provider) {
      setGenerationError('Select a valid voice.')
      return
    }

    setGenerationError(null)
    setPollStatus(null)
    setResultVideoUrl(null)
    setIsSubmitting(true)

    try {
      const created = await createTalk(trimmedSource, trimmedScript, { provider })
      if (created.ok === false) {
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
    const defaultKey = voiceOptions[0]?.optionKey ?? DEFAULT_VOICE_OPTION_KEY
    form.setFieldsValue({
      sourceUrl: '',
      script: '',
      voiceOptionKey: defaultKey,
    })
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
        {t('avatarVideo.panelTitle')}
      </Typography.Title>
      <div className={styles.card}>
        {voicesLoadError ? (
          <Alert
            className={styles.voiceAlert}
            type="warning"
            showIcon
            message={`${t('avatarVideo.voiceLoadFailedPrefix')} ${voicesLoadError}`}
          />
        ) : null}
        <Form<VideoFormValues>
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
                <span>{t('avatarVideo.sourceUrlLabel')}</span>
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
            extra={<p className={styles.helper}>{t('avatarVideo.sourceUrlHelper')}</p>}
          >
            <Input
              id={sourceFieldId}
              className={styles.input}
              placeholder={SOURCE_URL_PLACEHOLDER}
              autoComplete="off"
            />
          </Form.Item>

          <div className={styles.fieldBlock}>
            <p className={styles.previewLabel}>{t('avatarVideo.previewLabel')}</p>
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
                <div className={styles.previewPlaceholder}>
                  {t('avatarVideo.previewPlaceholderAlt')}
                </div>
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
                <span>{t('avatarVideo.scriptLabel')}</span>
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
              placeholder={t('avatarVideo.scriptPlaceholder')}
              autoSize={{ minRows: 4, maxRows: 10 }}
            />
          </Form.Item>

          <Form.Item
            className={styles.formItem}
            name="voiceOptionKey"
            label={<span className={styles.labelRow}>{t('avatarVideo.voiceLabel')}</span>}
            rules={[{ required: true, message: 'Choose a voice' }]}
          >
            <Select
              id={voiceFieldId}
              className={styles.voiceSelect}
              showSearch
              optionFilterProp="label"
              loading={voicesLoading}
              placeholder={voicesLoading ? 'Loading voices…' : 'Choose a voice'}
              options={voiceOptions.map((option) => ({
                value: option.optionKey,
                label: option.label,
              }))}
            />
          </Form.Item>

          <div className={styles.actions}>
            <Button
              type="primary"
              className={styles.primaryButton}
              onClick={handleCreateVideo}
              loading={isSubmitting}
            >
              {t('avatarVideo.createVideo')}
            </Button>
            <Button htmlType="button" className={styles.secondaryButton} onClick={handleReset}>
              {t('avatarVideo.reset')}
            </Button>
          </div>
        </Form>

        <p className={styles.statusLine}>{t('avatarVideo.statusHelper')}</p>
        {pollStatus ? (
          <p className={styles.pollStatus}>
            {t('avatarVideo.statusPrefix')} {pollStatus}
          </p>
        ) : null}
      </div>

      <div className={styles.resultCard}>
        <Typography.Text strong className={styles.resultTitle}>
          {t('avatarVideo.resultTitle')}
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
                <span>{t('avatarVideo.statusHelper')}</span>
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
            {t('avatarVideo.openVideoLink')}
          </a>
        ) : (
          <span className={styles.resultLinkDisabled} aria-disabled="true">
            {t('avatarVideo.openVideoLink')}
          </span>
        )}
      </div>
    </div>
  )
}
