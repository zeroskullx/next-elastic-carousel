'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'

import s from './styles.module.scss'
import { DOMPortal } from '../DOMPortal'
import { SideBarContent } from '../main/SideBar'

type DrawerProps = {
  open: boolean
  close: () => void
}

export function Drawer(props: DrawerProps) {
  const { open = false, close } = props

  const [isMounted, setIsMounted] = useState(false)
  const [animaContent, setAnimaContent] = useState('')

  const closeDrawer = () => {
    close()
    setAnimaContent(s.slideToBottom)
    setTimeout(() => {
      setIsMounted(false)
    }, 400)
  }

  useEffect(() => {
    const vaultDrawer = document.querySelector('.vault-drawer')

    if (vaultDrawer) {
      if (open) {
        vaultDrawer.classList.add('open')
        document.body.classList.add('scroll-lock')
        setIsMounted(true)
        setTimeout(() => {
          setAnimaContent(s.slideFromBottom)
        }, 40)
      } else {
        vaultDrawer.classList.remove('open')
        document.body.classList.remove('scroll-lock')
      }
    }
  }, [open])

  return (
    <>
      {isMounted && (
        <DOMPortal>
          <div
            className={clsx(s.drawer_overlay, !open ? s.fadeOut : '')}
            onClick={closeDrawer}
          ></div>

          <div
            className={clsx(
              s.drawer_content,
              animaContent
              //open ? s.slideFromBottom : s.slideToBottom
            )}
          >
            <div className={clsx(s.drawer_content_header)}>
              <span onClick={closeDrawer} className={s.drawer_close}>
                &times;
              </span>
            </div>

            <div className={clsx(s.drawer_content_body)}>
              <SideBarContent action={closeDrawer} />
            </div>
          </div>
        </DOMPortal>
      )}
    </>
  )
}
