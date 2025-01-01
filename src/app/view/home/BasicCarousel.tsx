import { items } from '@/app/data/itens'
import NextElasticCarousel from '@/next-elastic-carousel'

export function BasicCarousel() {
  return (
    <NextElasticCarousel>
      {items.map((item) => (
        <div
          style={{
            width: '100%',
            padding: '4rem',
            border: '1px solid #66167e',
            backgroundColor: '#fbf3ff',
            borderRadius: '.5rem',
          }}
          key={item.id}
        >
          {item.title}
        </div>
      ))}
    </NextElasticCarousel>
  )
}
