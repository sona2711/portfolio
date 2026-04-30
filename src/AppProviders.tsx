import { App as AntdApp, ConfigProvider, theme } from "antd";
import App from "@/App";
import { ThemeModeProvider } from "@/context/ThemeModeContext";
import { useThemeMode } from "@/context/useThemeMode";

const ThemedAppShell = () => {
  const { mode } = useThemeMode();

  return (
    <ConfigProvider
      theme={{
        algorithm: mode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          borderRadius: 8,
          colorPrimary: "#e2a53f",
        },
      }}
    >
      <AntdApp>
        <App />
      </AntdApp>
    </ConfigProvider>
  );
};

export const AppProviders = () => {
  return (
    <ThemeModeProvider>
      <ThemedAppShell />
    </ThemeModeProvider>
  );
};
