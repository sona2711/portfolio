import type { DidTalkScriptProvider } from '@/types/didTalkApi'

export type AvatarVoiceOption = {
  optionKey: string
  label: string
  provider: DidTalkScriptProvider
}

export type AiInterfaceAvatarVideoFormValues = {
  sourceUrl: string
  script: string
  voiceOptionKey: string
}
