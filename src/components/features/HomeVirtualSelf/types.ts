export type VirtualChatMessage = {
  id: string;
  text: string;
  variant: "neutral" | "accent";
  role: "assistant" | "user";
};
