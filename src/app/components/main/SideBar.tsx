import Link from 'next/link'
import s from './styles.module.scss'

export function Sidebar() {
  return (
    <div className={s.sidebar}>
      <SideBarContent />
    </div>
  )
}

export const SideBarContent = ({ action }: { action?: () => void }) => {
  return (
    <div className={s.sb_content}>
      <Link href="/" className={s.link} onClick={action}>
        Getting started
      </Link>
      <Link href="/examples" className={s.link} onClick={action}>
        Examples
      </Link>
      <Link href="/changelog" className={s.link} onClick={action}>
        Changelog
      </Link>
    </div>
  )
}
