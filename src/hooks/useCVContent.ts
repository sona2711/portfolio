import { useSyncExternalStore } from "react";
import { getCVContent, subscribeCVContent } from "@/data/CVContent";
import type { CVContentState } from "@/types/cvContent";

export const useCVContent = (): CVContentState =>
  useSyncExternalStore(subscribeCVContent, getCVContent, getCVContent);
