import { App as AntdApp, ConfigProvider, theme } from 'antd'
import enUS from 'antd/locale/en_US'
import ruRU from 'antd/locale/ru_RU'
import { useTranslation } from 'react-i18next'
import App from '@/App'
import { ThemeModeProvider } from '@/context/ThemeModeContext'
import { useThemeMode } from '@/context/useThemeMode'
import '@/i18n'

const ThemedAppShell = () => {
  const { mode } = useThemeMode()
  const { i18n } = useTranslation()
  const antdLocale = i18n.language === 'ru' ? ruRU : enUS

  return (
    <ConfigProvider
      locale={antdLocale}
      theme={{
        algorithm: mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          borderRadius: 8,
          colorPrimary: '#e2a53f',
        },
      }}
    >
      <AntdApp>
        <App />
      </AntdApp>
    </ConfigProvider>
  )
}

export const AppProviders = () => {
  return (
    <ThemeModeProvider>
      <ThemedAppShell />
    </ThemeModeProvider>
  )
}
