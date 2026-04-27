import axios from "axios";
import type {
  GeminiApiErrorPayload,
  GeminiGenerateContentResponse,
} from "../types/googleGenAI";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const model = import.meta.env.VITE_GEMINI_MODEL;
const apiBaseUrl =
  import.meta.env.VITE_GEMINI_API_BASE_URL ??
  "https://generativelanguage.googleapis.com/v1beta";
const RETRY_DELAY_MS = 1200;
const MARKDOWN_INSTRUCTION =
  "Return the answer in clean Markdown format. Use headings, bullet points, and code fences when appropriate.";

const buildGeminiUrl = (): string => {
  if (!apiKey) {
    throw new Error("Missing VITE_GOOGLE_API_KEY");
  }

  if (!model) {
    throw new Error("Missing VITE_GEMINI_MODEL");
  }

  return `${apiBaseUrl}/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
};

const wait = (delayMs: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, delayMs);
  });

const parseGeminiError = (error: unknown): string => {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error ? error.message : "Failed to generate text";
  }

  const payload = error.response?.data as GeminiApiErrorPayload | undefined;
  const statusCode = error.response?.status;
  const apiStatus = payload?.error?.status;
  const apiMessage = payload?.error?.message;

  if (apiStatus || apiMessage || statusCode) {
    return `${statusCode ?? "Unknown code"} ${apiStatus ?? "API_ERROR"}: ${apiMessage ?? "Gemini request failed"}`;
  }

  return error.message;
};

type GenerateTextOptions = {
  asMarkdown?: boolean;
};

const requestGeminiText = async (
  prompt: string,
  options?: GenerateTextOptions,
) =>
  axios.post<GeminiGenerateContentResponse>(
    buildGeminiUrl(),
    {
      contents: [
        {
          parts: [
            {
              text: options?.asMarkdown
                ? `${MARKDOWN_INSTRUCTION}\n\nUser prompt:\n${prompt}`
                : prompt,
            },
          ],
        },
      ],
    },
    {
      timeout: 15000,
    },
  );

export const generateText = async (
  prompt: string,
  options?: GenerateTextOptions,
): Promise<string> => {
  try {
    const response = await requestGeminiText(prompt, options);

    const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("Empty response from Gemini API");
    }

    return text;
  } catch (error) {
    const statusCode = axios.isAxiosError(error)
      ? error.response?.status
      : undefined;
    const shouldRetry = statusCode === 429 || statusCode === 503;

    if (shouldRetry) {
      await wait(RETRY_DELAY_MS);
      try {
        const retryResponse = await requestGeminiText(prompt, options);
        const retryText =
          retryResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (retryText) {
          return retryText;
        }
      } catch (retryError) {
        console.error("Gemini API retry error:", retryError);
        throw new Error(parseGeminiError(retryError));
      }
    }

    console.error("Gemini API error:", error);
    throw new Error(parseGeminiError(error));
  }
};
