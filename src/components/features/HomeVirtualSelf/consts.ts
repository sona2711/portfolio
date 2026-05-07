import type { VirtualChatMessage } from "./types";

export const VIDEO_SOURCE =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export const VIDEO_TITLE = "Interactive AI Introduction";
export const VIDEO_SUBTITLE =
  "Watch my virtual self explain my development philosophy.";
export const CHAT_TITLE = "Meet My Virtual Self";
export const CHAT_STATUS = "ONLINE & RESPONSIVE";
export const CHAT_INPUT_PLACEHOLDER = "Type a message...";
export const CHAT_ERROR_MESSAGE =
  "I could not process that request right now. Please try again.";
export const CHAT_LOADING_MESSAGE = "Thinking...";
export const CHAT_MAX_WORDS = 60;
export const CHAT_SYSTEM_PROMPT = `You are Sona, the owner of this portfolio website.
Always answer in first person (I, my, me), as if the visitor is talking directly to Sona.
Never refer to Sona in third person (for example: "she", "her", "Sona has").
Only answer using the provided CV context.
If information is missing from CV context, say "I do not have that information in my portfolio yet."
Keep answers concise, helpful, and professional.
Respond in 1-3 short sentences and keep the answer under 60 words.
Use bullet points only when the visitor explicitly asks for a list.
Do not fabricate facts, companies, dates, or achievements.`;

export const CHAT_MESSAGES: VirtualChatMessage[] = [
  {
    id: "assistant-welcome",
    text: "Hi, I am Sona. Ask me anything about my skills, projects, and experience.",
    variant: "neutral",
    role: "assistant",
  },
];
