export type DidCreateTalkHttpResponse = {
  id: string
  status: string
}

export type CreateTalkResult =
  | { ok: true; id: string; status: string }
  | { ok: false; error: string }

export type DidGetTalkHttpResponse = {
  id: string
  status: string
  result_url?: string
}

export type GetTalkResult =
  | { ok: true; status: string; resultUrl: string | undefined }
  | { ok: false; error: string }

export type PollTalkProgress = (status: string, attempt: number) => void

export type PollTalkSuccess = { success: true; videoUrl: string }

/** D-ID `script.provider` for Create talk (TTS). */
export type DidTalkScriptProvider = {
  type: string
  voice_id: string
}

export type CreateTalkOptions = {
  provider?: DidTalkScriptProvider
}

/** Subset of D-ID GET /tts/voices `IVoice` schema (OpenAPI). */
export type DidTtsVoiceLanguage = {
  language: string
  locale: string
  accent?: string
}

export type DidTtsVoice = {
  id: string
  name: string
  gender: string
  access: string
  provider: string
  languages: DidTtsVoiceLanguage[]
  styles: string[]
  language?: string
}

export type FetchTtsVoicesResult =
  | { ok: true; voices: DidTtsVoice[] }
  | { ok: false; error: string }
