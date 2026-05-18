import { Tabs } from 'antd'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { AiInterfaceAudioStub } from '@/components/features/AiInterfaceAudioStub'
import { AiInterfaceAvatarVideo } from '@/components/features/AiInterfaceAvatarVideo'
import { AiInterfaceDashboard } from '@/components/features/AiInterfaceDashboard'
import { TAB_KEY_AUDIO, TAB_KEY_TEXT, TAB_KEY_VIDEO } from './consts'
import styles from './styles.module.css'
import { DEFAULT_TAB_KEY } from './utils'

export const AiInterfaceWorkspace = () => {
  const { t } = useTranslation('admin')

  const tabItems = useMemo(
    () => [
      {
        key: TAB_KEY_TEXT,
        label: t('workspace.tabs.text'),
        children: <AiInterfaceDashboard />,
      },
      {
        key: TAB_KEY_VIDEO,
        label: t('workspace.tabs.video'),
        children: <AiInterfaceAvatarVideo />,
      },
      {
        key: TAB_KEY_AUDIO,
        label: t('workspace.tabs.audio'),
        children: <AiInterfaceAudioStub />,
      },
    ],
    [t],
  )

  return (
    <div className={styles.workspace}>
      <Tabs defaultActiveKey={DEFAULT_TAB_KEY} className={styles.tabs} items={tabItems} />
    </div>
  )
}
