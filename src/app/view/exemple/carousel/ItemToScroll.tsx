import { MarkdownCode } from '@/app/components/Markdown'
import { CarouselItem } from '../Item'
import { items, NextElasticCarousel } from '../nextElasticCarousel'

export function ItemToScrollCarousel() {
  const _code = `
  \`\`\`tsx
    <NextElasticCarousel
      itemsToShow={2}
      itemsToScroll={2}
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
        itemsToShow={2}
        itemsToScroll={2}
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
