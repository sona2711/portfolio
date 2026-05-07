export const sanitizeAssistantVoice = (text: string): string =>
  text
    .replace(/\bSona\b/gi, "I")
    .replace(/\bshe\b/gi, "I")
    .replace(/\bher\b/gi, "my")
    .replace(/\bhers\b/gi, "mine");

export const clampAssistantAnswer = (text: string, maxWords: number): string => {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) {
    return text.trim();
  }

  return `${words.slice(0, maxWords).join(" ")}...`;
};
