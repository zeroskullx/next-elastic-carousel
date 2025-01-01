import s from './styles.module.scss'
import { Sidebar } from './SideBar'
import { ContentSlot } from './ContentSlot'
import { LayoutContainer } from '../layout/Container'
import { ReactNode } from 'react'

type MainProps = {
  children: ReactNode
  sectorNav: ReactNode
}

export function Main({ children, sectorNav }: MainProps) {
  return (
    <main className={s.main}>
      <LayoutContainer>
        <Sidebar />
        <ContentSlot sectorNav={sectorNav}>{children}</ContentSlot>
      </LayoutContainer>
    </main>
  )
}
