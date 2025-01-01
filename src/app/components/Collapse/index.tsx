import React, { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'

import s from './styles.module.scss'
import { ChevronDown } from '@/app/assets/Chevron-down'

interface CollapseProps {
  title: string
  subTitle?: string
  children: React.ReactNode
  initOpen?: boolean
}

const Collapse: React.FC<CollapseProps> = ({
  title,
  children,
  initOpen,
  subTitle,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const toggleCollapse = () => {
    setIsOpen((prev) => !prev)
  }

  useEffect(() => {
    if (initOpen !== undefined) {
      setIsOpen(initOpen)
    }
  }, [initOpen])

  return (
    <div className={s.collapse}>
      <button className={s.collapse_header} onClick={toggleCollapse}>
        <div className={s.collapse_header_title}>
          {title} {subTitle && <span>{subTitle}</span>}
        </div>
        <span className={clsx(s.icon, isOpen ? s.open : '')}>
          <ChevronDown />
        </span>
      </button>
      <div
        className={s.collapse_content}
        style={{
          height:
            isOpen && contentRef.current
              ? `${contentRef.current.scrollHeight}px`
              : '0px',
        }}
        ref={contentRef}
      >
        <div className={s.collapse_content_inner}>{children}</div>
      </div>
    </div>
  )
}

export { Collapse }
