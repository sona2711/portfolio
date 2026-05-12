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
