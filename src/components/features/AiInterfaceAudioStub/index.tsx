import type { AiInterfaceAudioStubProps } from './types'
import { AUDIO_STUB_DESCRIPTION, AUDIO_STUB_TITLE } from './consts'
import styles from './styles.module.css'
import { audioStubSectionId } from './utils'

export const AiInterfaceAudioStub = (props: AiInterfaceAudioStubProps) => {
  void props
  return (
    <section id={audioStubSectionId} className={styles.shell} aria-labelledby={`${audioStubSectionId}-title`}>
      <h2 id={`${audioStubSectionId}-title`} className={styles.title}>
        {AUDIO_STUB_TITLE}
      </h2>
      <p className={styles.description}>{AUDIO_STUB_DESCRIPTION}</p>
    </section>
  )
}
