import { ReactNode } from 'react'

import s from './styles.module.scss'
import clsx from 'clsx'

export function LayoutContainer({
  children,
  className,
  hasGrid = true,
}: {
  children: ReactNode
  className?: string
  hasGrid?: boolean
}) {
  return (
    <div className={s.container_wrapper}>
      <div className={clsx(s.container, className, hasGrid && s.grid)}>
        {children}
      </div>
    </div>
  )
}
