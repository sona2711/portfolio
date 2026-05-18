import type { DidTalkScriptProvider } from '@/types/didTalkApi'

export type VoicePresetKey = 'jenny' | 'sonia' | 'natasha'

export type AvatarVoicePresetDef = {
  presetKey: VoicePresetKey
  optionKey: string
  provider: DidTalkScriptProvider
}

export type AvatarVoiceOption = {
  optionKey: string
  label: string
  provider: DidTalkScriptProvider
}

export type VideoFormValues = {
  sourceUrl: string
  script: string
  voiceOptionKey: string
}
