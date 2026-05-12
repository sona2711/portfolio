import { Tabs } from 'antd'
import { AiInterfaceAudioStub } from '@/components/features/AiInterfaceAudioStub'
import { AiInterfaceAvatarVideo } from '@/components/features/AiInterfaceAvatarVideo'
import { AiInterfaceDashboard } from '@/components/features/AiInterfaceDashboard'
import {
  AUDIO_TAB_LABEL,
  TAB_KEY_AUDIO,
  TAB_KEY_TEXT,
  TAB_KEY_VIDEO,
  TEXT_TAB_LABEL,
  VIDEO_TAB_LABEL,
} from './consts'
import styles from './styles.module.css'
import { DEFAULT_TAB_KEY } from './utils'

export const AiInterfaceWorkspace = () => {
  return (
    <div className={styles.workspace}>
      <Tabs
        defaultActiveKey={DEFAULT_TAB_KEY}
        className={styles.tabs}
        items={[
          {
            key: TAB_KEY_TEXT,
            label: TEXT_TAB_LABEL,
            children: <AiInterfaceDashboard />,
          },
          {
            key: TAB_KEY_VIDEO,
            label: VIDEO_TAB_LABEL,
            children: <AiInterfaceAvatarVideo />,
          },
          {
            key: TAB_KEY_AUDIO,
            label: AUDIO_TAB_LABEL,
            children: <AiInterfaceAudioStub />,
          },
        ]}
      />
    </div>
  )
}
