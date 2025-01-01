import Link from 'next/link'
import s from './styles.module.scss'

export function Sidebar() {
  return (
    <div className={s.sidebar}>
      <div className={s.sb_content}>
        <Link href="/" className={s.link}>
          Getting started
        </Link>
        <Link href="/examples" className={s.link}>
          Examples
        </Link>
        <Link href="/changelog" className={s.link}>
          Changelog
        </Link>
      </div>
    </div>
  )
}
