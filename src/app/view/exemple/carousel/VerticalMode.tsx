import { MarkdownCode } from '@/app/components/Markdown'
import { CarouselItem } from '../Item'
import { items, NextElasticCarousel } from '../nextElasticCarousel'

export function VerticalModeCarousel() {
  const _code = `
  \`\`\`tsx
    <NextElasticCarousel
      verticalMode={true}
      itemsToShow={3}
      itemsToScroll={1}
      slideSpacing={8}
      arrowsInside={true}
    >
       {...}
    </NextElasticCarousel>
  \`\`\`
  `

  return (
    <>
      <NextElasticCarousel
        itemHeight={100}
        verticalMode={true}
        itemsToShow={3}
        itemsToScroll={1}
        slideSpacing={8}
        arrowsInside={true}
        style={{ marginBottom: '1.5rem' }}
      >
        {items.map((item) => (
          <CarouselItem
            key={item.id}
            title={`Item ${item.id}`}
            style={{ height: 100 }}
          />
        ))}
      </NextElasticCarousel>

      <p className="text" style={{ marginBottom: '1rem' }}>
        Para montar este exemplo foi utilizado o seguinte configuração:
      </p>
      <MarkdownCode markdown={_code} />
    </>
  )
}
