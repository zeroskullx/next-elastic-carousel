import { MarkdownCode } from '@/app/components/Markdown'
import { CarouselItem } from '../Item'
import { items, NextElasticCarousel } from '../nextElasticCarousel'
import { useState } from 'react'
import { Checkbox } from '../Checkbox'
import s from './styles.module.scss'

export function IsRTLCarousel() {
  const [isRTL, setIsRTL] = useState(true)

  const _code = `
  \`\`\`tsx
    <NextElasticCarousel
      isRTL={${isRTL}}
      itemsToShow={2}
      slideSpacing={8}
    >
       {...}
    </NextElasticCarousel>
  \`\`\`
  `

  return (
    <>
      <div className={s.controls}>
        <Checkbox
          title="Show Right To Left"
          checked={isRTL}
          onChange={(e) => setIsRTL(e.target.checked)}
        />
      </div>
      <NextElasticCarousel
        itemHeight={200}
        isRTL={isRTL}
        itemsToShow={2}
        slideSpacing={8}
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
