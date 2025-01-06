'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

import s from './styles.module.scss'

type GotoData = {
  name: string
  url: string
}

type SectorNavProps = {
  goto: GotoData[]
}

export function SectorNav({ goto }: SectorNavProps) {
  const [activeHash, setActiveHash] = useState<string | null>(null)
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    // Callback para o IntersectionObserver
    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id
        if (entry.isIntersecting) {
          setActiveHash(`#${id}`)
        }
      })
    }

    // Inicializa o IntersectionObserver
    const observer = new IntersectionObserver(handleIntersect, {
      root: null, // Usa o viewport como root
      threshold: 0.5, // 50% do elemento visível
    })

    // Observar as seções
    goto.forEach((item) => {
      const section = document.getElementById(item.url.replace('#', ''))
      if (section) {
        sectionsRef.current[item.url] = section
        observer.observe(section)
      }
    })

    return () => {
      // Limpa os observers ao desmontar o componente
      Object.values(sectionsRef.current).forEach((section) => {
        if (section) {
          observer.unobserve(section)
        }
      })
    }
  }, [])

  return (
    <>
      <div className={s.sector_nav_title}>Content</div>
      <ul className={s.sector_nav_list}>
        {goto.map((item, index) => {
          return (
            <li
              key={index}
              className={clsx(activeHash === item.url ? s.active : '')}
            >
              <Link href={item.url}>{item.name}</Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}
