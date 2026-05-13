import axios from 'axios'
import type {
  CreateTalkOptions,
  CreateTalkResult,
  DidCreateTalkHttpResponse,
  DidGetTalkHttpResponse,
  DidTtsVoice,
  FetchTtsVoicesResult,
  GetTalkResult,
  PollTalkProgress,
  PollTalkSuccess,
} from '@/types/didTalkApi'

const DEFAULT_DID_BASE = 'https://api.d-id.com'

/** Resolves `VITE_DID_API_URL` or falls back to `DEFAULT_DID_BASE`; trims trailing slashes. */
const getDidBaseUrl = (): string => {
  const raw = import.meta.env.VITE_DID_API_URL
  if (typeof raw !== 'string' || !raw.trim()) {
    return DEFAULT_DID_BASE
  }
  return raw.trim().replace(/\/+$/, '')
}

/** Returns trimmed `VITE_DID_API_KEY`, or `undefined` if missing or blank. */
const getApiKey = (): string | undefined => {
  const key = import.meta.env.VITE_DID_API_KEY
  if (typeof key !== 'string') {
    return undefined
  }
  const trimmed = key.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

/** True when a non-empty D-ID API key is set; UI can gate without reading `import.meta.env` directly. */
export const isDidApiClientConfigured = (): boolean => Boolean(getApiKey())

/** Turns axios/network errors into a single message suitable for UI display. */
const formatRequestError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    const data = error.response?.data as
      | { message?: string; error?: { message?: string } }
      | undefined
    const apiMessage =
      (typeof data?.message === 'string' && data.message) ||
      (typeof data?.error?.message === 'string' && data.error.message) ||
      error.message
    return status ? `${status}: ${apiMessage}` : apiMessage
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'Request failed'
}

/** Narrowing helper for JSON parsing without trusting incoming shapes. */
const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

/** Parses D-ID `GET /tts/voices` JSON into `DidTtsVoice[]`; drops malformed rows. */
const parseTtsVoicesPayload = (data: unknown): DidTtsVoice[] => {
  if (!Array.isArray(data)) {
    return []
  }

  const voices: DidTtsVoice[] = []

  for (const item of data) {
    if (!isRecord(item)) {
      continue
    }
    const id = item.id
    const name = item.name
    const gender = item.gender
    const access = item.access
    const provider = item.provider
    if (
      typeof id !== 'string' ||
      typeof name !== 'string' ||
      typeof gender !== 'string' ||
      typeof access !== 'string' ||
      typeof provider !== 'string'
    ) {
      continue
    }

    const rawLangs = item.languages
    const languages: DidTtsVoice['languages'] = []
    if (Array.isArray(rawLangs)) {
      for (const lang of rawLangs) {
        if (!isRecord(lang)) {
          continue
        }
        const language = lang.language
        const locale = lang.locale
        if (typeof language !== 'string' || typeof locale !== 'string') {
          continue
        }
        const accent = lang.accent
        languages.push({
          language,
          locale,
          ...(typeof accent === 'string' ? { accent } : {}),
        })
      }
    }

    const rawStyles = item.styles
    const styles: string[] = []
    if (Array.isArray(rawStyles)) {
      for (const s of rawStyles) {
        if (typeof s === 'string') {
          styles.push(s)
        }
      }
    }

    const topLanguage = item.language
    const voice: DidTtsVoice = {
      id,
      name,
      gender,
      access,
      provider,
      languages,
      styles,
    }
    if (typeof topLanguage === 'string') {
      voice.language = topLanguage
    }
    voices.push(voice)
  }

  return voices
}

/** Lists TTS voices (`GET /tts/voices`). Optional `provider` filters by vendor per D-ID docs. */
export const fetchTtsVoices = async (params?: {
  provider?: string
}): Promise<FetchTtsVoicesResult> => {
  const apiKey = getApiKey()
  if (!apiKey) {
    return { ok: false as const, error: 'Missing VITE_DID_API_KEY in environment.' }
  }

  const baseUrl = getDidBaseUrl()

  try {
    const { data } = await axios.get<unknown>(`${baseUrl}/tts/voices`, {
      auth: {
        username: apiKey,
        password: '',
      },
      params:
        typeof params?.provider === 'string' && params.provider.trim()
          ? { provider: params.provider.trim() }
          : undefined,
      timeout: 30_000,
    })
    const voices = parseTtsVoicesPayload(data)
    return { ok: true as const, voices }
  } catch (error) {
    return { ok: false as const, error: formatRequestError(error) }
  }
}

/**
 * Starts a talking-head render (`POST /talks`). Pass `options.provider` to pick TTS voice;
 * omitted provider uses D-ID default behavior.
 */
export const createTalk = async (
  sourceUrl: string,
  script: string,
  options?: CreateTalkOptions,
): Promise<CreateTalkResult> => {
  const apiKey = getApiKey()
  if (!apiKey) {
    return { ok: false as const, error: 'Missing VITE_DID_API_KEY in environment.' }
  }

  const baseUrl = getDidBaseUrl()

  const scriptBody: {
    type: 'text'
    input: string
    provider?: CreateTalkOptions['provider']
  } = {
    type: 'text',
    input: script,
  }

  if (options?.provider) {
    scriptBody.provider = options.provider
  }

  try {
    const { data } = await axios.post<DidCreateTalkHttpResponse>(
      `${baseUrl}/talks`,
      {
        source_url: sourceUrl,
        script: scriptBody,
      },
      {
        auth: {
          username: apiKey,
          password: '',
        },
        headers: { 'Content-Type': 'application/json' },
        timeout: 30_000,
      },
    )
    return { ok: true as const, id: data.id, status: data.status }
  } catch (error) {
    return { ok: false as const, error: formatRequestError(error) }
  }
}

/** Fetches one talk job (`GET /talks/:id`) for status and `result_url` when complete. */
export const getTalk = async (talkId: string): Promise<GetTalkResult> => {
  const apiKey = getApiKey()
  if (!apiKey) {
    return { ok: false as const, error: 'Missing VITE_DID_API_KEY in environment.' }
  }

  const baseUrl = getDidBaseUrl()

  try {
    const { data } = await axios.get<DidGetTalkHttpResponse>(
      `${baseUrl}/talks/${encodeURIComponent(talkId)}`,
      {
        auth: {
          username: apiKey,
          password: '',
        },
        timeout: 15_000,
      },
    )
    return {
      ok: true as const,
      status: data.status,
      resultUrl: data.result_url,
    }
  } catch (error) {
    return { ok: false as const, error: formatRequestError(error) }
  }
}

/**
 * Polls `getTalk` until status is terminal (`done`, `error`, `rejected`) or attempts/timeouts.
 * Calls `onProgress` with each non-terminal status; resolves with the finished video URL on success.
 */
export const pollTalkUntilTerminal = async (
  talkId: string,
  onProgress?: PollTalkProgress,
): Promise<PollTalkSuccess> => {
  const maxAttempts = 30
  const delayMs = 2000

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const result = await getTalk(talkId)

    if (result.ok === false) {
      throw new Error(result.error)
    }

    onProgress?.(result.status, attempt)

    if (result.status === 'done') {
      const videoUrl = result.resultUrl?.trim()
      if (!videoUrl) {
        throw new Error('Talk completed but no result video URL was returned.')
      }
      return { success: true, videoUrl }
    }

    if (result.status === 'error' || result.status === 'rejected') {
      throw new Error(`Video generation failed with status: ${result.status}`)
    }

    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, delayMs)
    })
  }

  throw new Error('Timeout: video generation took too long.')
}
