import { useTranslation } from 'react-i18next'
import { AUDIO_STUB_SECTION_ID } from './consts'
import styles from './styles.module.css'
import type { AiInterfaceAudioStubProps } from './types'

export const AiInterfaceAudioStub = (props: AiInterfaceAudioStubProps) => {
  void props
  const { t } = useTranslation('admin')

  return (
    <section
      id={AUDIO_STUB_SECTION_ID}
      className={styles.shell}
      aria-labelledby={`${AUDIO_STUB_SECTION_ID}-title`}
    >
      <h2 id={`${AUDIO_STUB_SECTION_ID}-title`} className={styles.title}>
        {t('audioStub.title')}
      </h2>
      <p className={styles.description}>{t('audioStub.description')}</p>
    </section>
  )
}
