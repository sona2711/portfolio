export type GeminiGenerateContentResponse = {
    candidates?: Array<{
      content?: {
        parts?: Array<{
          text?: string;
        }>;
      };
    }>;
  };

export type GeminiApiErrorPayload = {
  error?: {
    code?: number;
    status?: string;
    message?: string;
  };
};
  