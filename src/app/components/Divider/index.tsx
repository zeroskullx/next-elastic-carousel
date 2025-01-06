import s from './styles.module.scss'

type DividerProps = {
  style?: React.CSSProperties
}

export function Divider(props: DividerProps) {
  return <hr className={s.divider_root} {...props} />
}
