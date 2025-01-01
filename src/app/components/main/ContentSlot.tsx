import { ReactNode } from 'react'

import s from './styles.module.scss'

type ContentSlotProps = {
  children: ReactNode
  sectorNav: ReactNode
}

export function ContentSlot({ children, sectorNav }: ContentSlotProps) {
  return (
    <div className={s.content_slot}>
      <div className={s.main}>{children}</div>
      <div className={s.sector_nav}>
        <div className={s.sector_nav_itens}>{sectorNav}</div>
      </div>
    </div>
  )
}
