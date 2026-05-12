import type { AiInterfaceAudioStubProps } from './types'
import { AUDIO_STUB_DESCRIPTION, AUDIO_STUB_TITLE , AUDIO_STUB_SECTION_ID } from './consts'
import styles from './styles.module.css'

export const AiInterfaceAudioStub = (props: AiInterfaceAudioStubProps) => {
  void props
  return (
    <section id={AUDIO_STUB_SECTION_ID} className={styles.shell} aria-labelledby={`${AUDIO_STUB_SECTION_ID}-title`}>
      <h2 id={`${AUDIO_STUB_SECTION_ID}-title`} className={styles.title}>
        {AUDIO_STUB_TITLE}
      </h2>
      <p className={styles.description}>{AUDIO_STUB_DESCRIPTION}</p>
    </section>
  )
}
