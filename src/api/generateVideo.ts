import axios from 'axios'

const DEFAULT_DID_BASE = 'https://api.d-id.com'

const getDidBaseUrl = (): string => {
  const raw = import.meta.env.VITE_DID_API_URL
  if (typeof raw !== 'string' || !raw.trim()) {
    return DEFAULT_DID_BASE
  }
  return raw.trim().replace(/\/+$/, '')
}

const getApiKey = (): string | undefined => {
  const key = import.meta.env.VITE_DID_API_KEY
  if (typeof key !== 'string') {
    return undefined
  }
  const trimmed = key.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

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

type CreateTalkResponse = {
  id: string
  status: string
}

export type CreateTalkResult =
  | { ok: true; id: string; status: string }
  | { ok: false; error: string }

export const createTalk = async (sourceUrl: string, script: string): Promise<CreateTalkResult> => {
  const apiKey = getApiKey()
  if (!apiKey) {
    return { ok: false, error: 'Missing VITE_DID_API_KEY in environment.' }
  }

  const baseUrl = getDidBaseUrl()

  try {
    const { data } = await axios.post<CreateTalkResponse>(
      `${baseUrl}/talks`,
      {
        source_url: sourceUrl,
        script: {
          type: 'text',
          input: script,
        },
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
    return { ok: true, id: data.id, status: data.status }
  } catch (error) {
    return { ok: false, error: formatRequestError(error) }
  }
}

type GetTalkResponse = {
  id: string
  status: string
  result_url?: string
}

export type GetTalkResult =
  | { ok: true; status: string; resultUrl: string | undefined }
  | { ok: false; error: string }

export const getTalk = async (talkId: string): Promise<GetTalkResult> => {
  const apiKey = getApiKey()
  if (!apiKey) {
    return { ok: false, error: 'Missing VITE_DID_API_KEY in environment.' }
  }

  const baseUrl = getDidBaseUrl()

  try {
    const { data } = await axios.get<GetTalkResponse>(
      `${baseUrl}/talks/${encodeURIComponent(talkId)}`,
      {
        auth: {
          username: apiKey,
          password: '',
        },
        timeout: 15_000,
      },
    )
    return { ok: true, status: data.status, resultUrl: data.result_url }
  } catch (error) {
    return { ok: false, error: formatRequestError(error) }
  }
}

export type PollTalkProgress = (status: string, attempt: number) => void

export type PollTalkSuccess = { success: true; videoUrl: string }

export const pollTalkUntilTerminal = async (
  talkId: string,
  onProgress?: PollTalkProgress,
): Promise<PollTalkSuccess> => {
  const maxAttempts = 30
  const delayMs = 2000

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const result = await getTalk(talkId)

    if (!result.ok) {
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
