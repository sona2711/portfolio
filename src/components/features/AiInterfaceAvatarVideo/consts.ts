import type { DidTalkScriptProvider } from '@/types/didTalkApi'

/** Optional static demo MP4/WebM URL for local preview only; leave empty for placeholder UI. */
export const DEMO_VIDEO_URL = ''

export const SOURCE_URL_PLACEHOLDER =
  'https://d-id-public-bucket.s3.us-west-2.amazonaws.com/alice.jpg'

export type VoiceFallbackPresetDef = {
  optionKey: string
  presetKey: 'jenny' | 'sonia' | 'natasha'
  provider: DidTalkScriptProvider
}

export const VOICE_FALLBACK_PRESET_DEFS: VoiceFallbackPresetDef[] = [
  {
    optionKey: 'microsoft:en-US-JennyNeural',
    presetKey: 'jenny',
    provider: { type: 'microsoft', voice_id: 'en-US-JennyNeural' },
  },
  {
    optionKey: 'microsoft:en-GB-SoniaNeural',
    presetKey: 'sonia',
    provider: { type: 'microsoft', voice_id: 'en-GB-SoniaNeural' },
  },
  {
    optionKey: 'microsoft:en-AU-NatashaNeural',
    presetKey: 'natasha',
    provider: { type: 'microsoft', voice_id: 'en-AU-NatashaNeural' },
  },
]

export const DEFAULT_VOICE_OPTION_KEY = VOICE_FALLBACK_PRESET_DEFS[0]?.optionKey ?? ''
