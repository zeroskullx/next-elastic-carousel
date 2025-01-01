import { ReactNode } from 'react'

import s from './styles.module.scss'
import { Header } from '../../Header'
import { Main } from '../../main'

type WrapperProps = {
  mainChildren: ReactNode
  sectorNav: ReactNode
}

export function Wrapper({ mainChildren, sectorNav }: WrapperProps) {
  return (
    <div className={s.main}>
      <Header />

      <Main sectorNav={sectorNav}>{mainChildren}</Main>
    </div>
  )
}
