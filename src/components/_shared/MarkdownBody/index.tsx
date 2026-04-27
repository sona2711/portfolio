import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { MarkdownBodyProps } from './types'
import styles from './styles.module.css'

export const MarkdownBody = ({ markdown, className }: MarkdownBodyProps) => {
  const rootClass = className ? `${styles.prose} ${className}` : styles.prose

  return (
    <div className={rootClass}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  )
}
