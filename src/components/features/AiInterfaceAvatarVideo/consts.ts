import type { AvatarVoiceOption } from './types'

/** Optional static demo MP4/WebM URL for local preview only; leave empty for placeholder UI. */
export const DEMO_VIDEO_URL = ''

export const VIDEO_PANEL_TITLE = 'Avatar video'

export const SOURCE_URL_LABEL = 'Source image URL'

export const SOURCE_URL_HELPER =
  'Must be a reachable https (or s3) URL. You can use any image URL.'

export const SOURCE_URL_PLACEHOLDER =
  'https://d-id-public-bucket.s3.us-west-2.amazonaws.com/alice.jpg'

export const PREVIEW_LABEL = 'Preview'

export const SCRIPT_LABEL = 'What should the avatar say?'

export const SCRIPT_PLACEHOLDER =
  'Enter the text you want the avatar to say.'

export const CREATE_VIDEO_LABEL = 'Create video'

export const RESET_LABEL = 'Reset'

export const STATUS_HELPER = 'The rendered video appears here when ready.'

export const GENERATION_STATUS_PREFIX = 'Status:'

export const MISSING_DID_CONFIG_MESSAGE =
  'Set VITE_DID_API_KEY (and optionally VITE_DID_API_URL) in your environment to generate video.'

export const RESULT_TITLE = 'Result'

export const OPEN_VIDEO_LINK_LABEL = 'Open video in a new tab'

export const PREVIEW_PLACEHOLDER_ALT = 'Image preview will appear when the URL is valid.'

export const VOICE_LABEL = 'Voice / TTS'

export const VOICE_LOAD_FAILED_PREFIX =
  'Could not load voices from D-ID. Using offline presets:'

export const VOICE_FALLBACK_PRESETS: AvatarVoiceOption[] = [
  {
    optionKey: 'microsoft:en-US-JennyNeural',
    label: 'English (US) — Jenny (microsoft)',
    provider: { type: 'microsoft', voice_id: 'en-US-JennyNeural' },
  },
  {
    optionKey: 'microsoft:en-GB-SoniaNeural',
    label: 'English (UK) — Sonia (microsoft)',
    provider: { type: 'microsoft', voice_id: 'en-GB-SoniaNeural' },
  },
  {
    optionKey: 'microsoft:en-AU-NatashaNeural',
    label: 'English (AU) — Natasha (microsoft)',
    provider: { type: 'microsoft', voice_id: 'en-AU-NatashaNeural' },
  },
]

export const DEFAULT_VOICE_OPTION_KEY = VOICE_FALLBACK_PRESETS[0]?.optionKey ?? ''
