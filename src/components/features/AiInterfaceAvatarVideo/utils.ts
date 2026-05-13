import type { DidTtsVoice } from '@/types/didTalkApi'
import type { AvatarVoiceOption } from './types'

const IMAGE_EXT_PATTERN = /\.(jpe?g|png)$/i

export const buildVoiceOptionKey = (provider: string, voiceId: string): string =>
  `${provider.trim()}:${voiceId.trim()}`

export const buildVoiceLabel = (voice: DidTtsVoice): string => {
  const first = voice.languages[0]
  const localeBit = first
    ? `${first.language} (${first.locale})`
    : voice.language?.trim() || 'Voice'
  return `${localeBit} — ${voice.name} (${voice.provider})`
}

export const didVoiceToAvatarOption = (voice: DidTtsVoice): AvatarVoiceOption => ({
  optionKey: buildVoiceOptionKey(voice.provider, voice.id),
  label: buildVoiceLabel(voice),
  provider: {
    type: voice.provider,
    voice_id: voice.id,
  },
})

export const findProviderForVoiceOptionKey = (
  optionKey: string,
  options: AvatarVoiceOption[],
): AvatarVoiceOption['provider'] | undefined =>
  options.find((o) => o.optionKey === optionKey)?.provider

export const getSourceImageUrlFieldError = (raw: string): string | undefined => {
  const value = raw.trim()
  if (!value) {
    return 'Source image URL is required'
  }

  const lower = value.toLowerCase()
  if (lower.startsWith('s3://')) {
    if (!IMAGE_EXT_PATTERN.test(value)) {
      return 'Must be a valid image URL'
    }
    return undefined
  }

  let parsed: URL
  try {
    parsed = new URL(value)
  } catch {
    return 'Enter a valid URL'
  }

  const protocol = parsed.protocol.toLowerCase()
  if (protocol !== 'https:' && protocol !== 'http:') {
    return 'Use an https, http, or s3:// URL'
  }

  if (!IMAGE_EXT_PATTERN.test(parsed.pathname)) {
    return 'URL path must end with .jpg, .jpeg, or .png'
  }

  return undefined
}
