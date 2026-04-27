// CVContent.ts
import type { CVContentState } from '@/types/cvContent'

const STORAGE_KEY = 'cvContent'
const canUseStorage = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'

const initialState: CVContentState = {
    sections: {
      aboutMe: "",
      summary: "",
      experience: "",
      projects: "",
      skills: "",
      education: "",
      certifications: "",
      languages: "",
      interests: "",
      references: "",
      virtualSelf: "",
    },
  };

// Try to load saved data from localStorage
const loadSavedState = (): CVContentState => {
  if (!canUseStorage) {
    return { ...initialState }
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved) as Partial<CVContentState>
      return {
        ...initialState,
        ...parsed,
        sections: {
          ...initialState.sections,
          ...(parsed.sections ?? {}),
        },
      }
    }
  } catch (error) {
    console.error('Failed to load CV content:', error)
  }
  return { ...initialState }
}

// Start with saved data instead of fresh initialState
let state: CVContentState = loadSavedState()

const listeners = new Set<() => void>()

const emitChange = () => {
  listeners.forEach((listener) => listener())
  
  // Save to localStorage whenever state changes
  if (!canUseStorage) {
    return
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.error('Failed to save CV content:', error)
  }
}

// Rest of your code remains the same...
export const getCVContent = (): CVContentState => state
export const setCVContent = (partial: Partial<CVContentState>) => {
  state = { ...state, ...partial }
  emitChange()
}
export const resetCVContent = () => {
  state = { ...initialState }
  emitChange()
  if (canUseStorage) {
    window.localStorage.removeItem(STORAGE_KEY) // Clear saved data on reset
  }
}
export const subscribeCVContent = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}