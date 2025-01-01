import s from './styles.module.scss'
import { LayoutContainer } from '../layout/Container'

export function Header() {
  return (
    <header className={s.header}>
      <LayoutContainer className={s.h} hasGrid={false}>
        header
      </LayoutContainer>
    </header>
  )
}
