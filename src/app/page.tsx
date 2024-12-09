'use client'

import { useRef } from 'react'

import styles from './page.module.scss'
import NextElasticCarousel from 'next-elastic-carousel'

export default function Home() {
  const carouselRef = useRef<any>(null)
  let resetTimeout: any
  const enableAutoPlay = true
  const autoPlaySpeed = 3000
  //const totalPages = 3

  const items = [
    { id: 1, title: 'Page 1' },
    { id: 2, title: 'Page 2' },
    { id: 3, title: 'Page 3' },
    { id: 4, title: 'Page 4' },
    { id: 5, title: 'Page 5' },
  ]

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <p>Next Elastic Carousel</p>
      </div>
      <div className={styles.body}>
        <div className={styles.sidebar}>
          <div className={styles.custom_link}>Getting started</div>
        </div>
        <div className={styles.container}>
          <h1>Getting started</h1>
          <h2>Install</h2>
          <div className={styles.code}>
            <code>npm install next-elastic-carousel</code>
          </div>

          <h2>Import</h2>
          <div className={styles.code}>
            <code>{`import Carousel from 'next-elastic-carousel'`}</code>
          </div>

          <div className={styles.carousel_wrapper}>
            <div className={styles.carousel_container}>
              <div className={styles.live_preview}>
                <NextElasticCarousel
                  //isRTL
                  renderLoading={<Loading />}
                  itemHeight={280}
                  ref={carouselRef}
                  //className={'carousel-custom'}
                  //verticalMode={true}
                  slideSpacing={16}
                  arrowsInside={true}
                  showArrows={true}
                  pagination={true}
                  itemsToShow={1}
                  itemsToScroll={1}
                  enableAutoPlay={enableAutoPlay}
                  autoPlaySpeed={autoPlaySpeed}
                  onNextEnd={({ index }: { index: any }) => {
                    if (enableAutoPlay) {
                      clearTimeout(resetTimeout)
                      if (index + 1 === items.length) {
                        resetTimeout = setTimeout(() => {
                          if (carouselRef?.current) carouselRef.current.goTo(0)
                        }, autoPlaySpeed) // same time
                      }
                    }
                  }}
                >
                  {items.map((item) => (
                    <div key={item.id} className={styles.card}>
                      {item.title}
                    </div>
                  ))}
                </NextElasticCarousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Loading = () => {
  return <div className={styles.loading}>Um momento...</div>
}
