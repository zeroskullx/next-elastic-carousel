'use client'

import { use, useEffect, useState } from 'react'
import { CarouselItem } from '../Item'
import { items, NextElasticCarousel } from '../nextElasticCarousel'
import { Checkbox } from '../Checkbox'

import s from './styles.module.scss'
import { MarkdownCode } from '@/app/components/Markdown'

export function ArrowsCarousel() {
  const [showArrow, setShowArrow] = useState(true)
  const [showArrowInside, setShowArrowInside] = useState(false)
  const [disableArrowsOnEnd, setDisableArrowsOnEnd] = useState(true)
  const [disabled, setDisabled] = useState(false)

  const _code = `
  \`\`\`tsx
    <NextElasticCarousel
      showArrows={${showArrow}}
      disableArrowsOnEnd={${disableArrowsOnEnd}}
      arrowsInside={${showArrowInside}}
    >
      {...}
    </NextElasticCarousel>
  \`\`\`
  `

  useEffect(() => {
    if (!showArrow) {
      setShowArrowInside(false)
      setDisableArrowsOnEnd(false)
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [showArrow])

  return (
    <>
      <div className={s.controls}>
        <Checkbox
          title="Show Arrows"
          checked={showArrow}
          onChange={(e) => setShowArrow(e.target.checked)}
        />
        <Checkbox
          title="Disable Arrows On End"
          checked={disableArrowsOnEnd}
          onChange={(e) => setDisableArrowsOnEnd(e.target.checked)}
          disabled={disabled}
        />
        <Checkbox
          title="Show Arrows Inside"
          checked={showArrowInside}
          onChange={(e) => setShowArrowInside(e.target.checked)}
          disabled={disabled}
        />
      </div>
      <NextElasticCarousel
        itemHeight={200}
        showArrows={showArrow}
        arrowsInside={showArrowInside}
        disableArrowsOnEnd={disableArrowsOnEnd}
        style={{ marginBottom: '1.5rem' }}
      >
        {items.map((item) => (
          <CarouselItem key={item.id} title={`Item ${item.id}`} />
        ))}
      </NextElasticCarousel>

      <p className="text" style={{ marginBottom: '1rem' }}>
        Para montar este exemplo foi utilizado o seguinte configuração:
      </p>
      <MarkdownCode markdown={_code} />
    </>
  )
}
