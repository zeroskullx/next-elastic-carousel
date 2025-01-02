import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

type DOMPortalProps = {
  children: React.ReactNode
}

export function DOMPortal({ children }: DOMPortalProps) {
  const [container, setContainer] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    setContainer(div)

    return () => {
      document.body.removeChild(div)
    }
  }, [])

  if (!container) return null

  return ReactDOM.createPortal(children, container)
}
