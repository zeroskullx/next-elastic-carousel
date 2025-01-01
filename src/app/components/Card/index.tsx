import clsx from 'clsx'
import s from './styles.module.scss'

type CardProps = {
  children: React.ReactNode
}

export function Card(props: CardProps) {
  const { children } = props
  return (
    <div className={clsx(s.card_root)}>
      <div
        className={clsx(s.card_content, s.border_sm, s.shadow_sm, s.height_md)}
      >
        {children}
      </div>
    </div>
  )
}
