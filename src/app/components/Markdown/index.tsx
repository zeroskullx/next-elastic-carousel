import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

import s from './styles.module.scss'
import { CSSProperties } from 'react'
import clsx from 'clsx'

type CopyButtonProps = { value: string }

type MarkdownCodeProps = {
  markdown: string
  copy?: { value: string }
  style?: CSSProperties
  className?: string
}

const CopyButton = ({ value }: CopyButtonProps) => {
  const handleSave = () => {
    navigator.clipboard.writeText(value)
  }

  return (
    <button onClick={handleSave} className={s.copy_button}>
      Copy
    </button>
  )
}

export function MarkdownCode({
  markdown,
  copy,
  style,
  className,
}: MarkdownCodeProps) {
  return (
    <div className={clsx(s.markdown_root, className)} style={style}>
      {copy && <CopyButton value={copy.value} />}

      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')

            const _children = String(children).replace(/\n$/, '')

            return !inline && match ? (
              <SyntaxHighlighter
                children={_children}
                style={dracula}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
