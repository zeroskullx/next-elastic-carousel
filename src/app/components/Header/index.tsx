'use client'

import { useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

import s from './styles.module.scss'
import { MenuSvg } from '@/app/assets/menu'
import { GithubSvg } from '@/app/assets/github'
import { LayoutContainer } from '../layout/Container'
import { NecLogoSvg } from '../../assets/necLogo'
import { Drawer } from './Drawer'

export function Header() {
  const [open, setOpen] = useState(false)

  const close = () => {
    setOpen(false)
  }

  return (
    <header className={s.header}>
      <LayoutContainer className={s.h} hasGrid={false}>
        <div className={s.logoWrapper}>
          <Link href="/" className={s.logo}>
            <span className={s.btn}>
              <NecLogoSvg />
            </span>
            <span>Next Elastic Carousel</span>
          </Link>
        </div>

        <div className={s.actions}>
          <Link href="/" className={s.gh}>
            <span className={clsx(s.btn, s.act_btn)}>
              <GithubSvg />
            </span>
          </Link>

          <div className={clsx(s.btn_drawer)}>
            <span
              className={clsx(s.btn, s.act_btn)}
              onClick={() => setOpen(!open)}
            >
              <MenuSvg />
            </span>
            <Drawer open={open} close={close} />
          </div>
        </div>
      </LayoutContainer>
    </header>
  )
}
