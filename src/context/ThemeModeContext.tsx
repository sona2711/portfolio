import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ThemeModeContext, type ThemeMode, type ThemeModeContextValue } from "./themeModeContextValue";

const THEME_MODE_STORAGE_KEY = "portfolio-theme-mode";

const getInitialMode = (): ThemeMode => {
  const stored = localStorage.getItem(THEME_MODE_STORAGE_KEY);
  return stored === "dark" ? "dark" : "light";
};

export const ThemeModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode);

  useEffect(() => {
    document.body.dataset.theme = mode;
    localStorage.setItem(THEME_MODE_STORAGE_KEY, mode);
  }, [mode]);

  const value = useMemo<ThemeModeContextValue>(
    () => ({
      mode,
      toggleMode: () => {
        setMode((currentMode) => (currentMode === "light" ? "dark" : "light"));
      },
    }),
    [mode],
  );

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>;
};
