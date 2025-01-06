import { MarkdownCode } from '@/app/components/Markdown'
import { CarouselItem } from '../Item'
import { items, NextElasticCarousel } from '../nextElasticCarousel'

export function EasingCarousel() {
  const _code = `
  \`\`\`tsx
    <NextElasticCarousel
      easing="cubic-bezier(1,.15,.55,1.54)"
      tiltEasing="cubic-bezier(0.5, 2, 0.75, 10)"
      transitionMs={700}
      slideSpacing={8}
    >
       {...}
    </NextElasticCarousel>
  \`\`\`
  `

  return (
    <>
      <NextElasticCarousel
        itemHeight={200}
        slideSpacing={8}
        easing="cubic-bezier(1,.15,.55,1.54)"
        tiltEasing="cubic-bezier(0.5, 2, 0.75, 10)"
        transitionMs={700}
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
