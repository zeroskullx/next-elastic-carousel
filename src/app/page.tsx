'use client'

import { useRef } from 'react'

import { Wrapper } from './components/layout/Wrapper'
import { HomePage } from './view/home'
import { SectorNav } from './components/SectorNav'

const goto = [
  { name: 'Install', url: '#install' },
  { name: 'Import', url: '#import' },
  { name: 'Basic', url: '#basic' },
  { name: 'Code', url: '#code' },
  { name: 'Props', url: '#props' },
]

export default function Home() {
  const carouselRef = useRef<any>(null)
  let resetTimeout: any
  const enableAutoPlay = false
  const autoPlaySpeed = 3000
  //const totalPages = 3

  return (
    <Wrapper
      mainChildren={<HomePage />}
      sectorNav={<SectorNav goto={goto} />}
    />

    // <div className={styles.main}>
    //   <div className={styles.header}>
    //     <p>Next Elastic Carousel</p>
    //   </div>
    //   <div className={styles.body}>
    //     <div className={styles.sidebar}>
    //       <div className={styles.custom_link}>Getting started</div>
    //     </div>
    //     <div className={styles.container}>
    //       <h1>Getting started</h1>
    //       <h2>Install</h2>
    //       <div className={styles.code}>
    //         <code>npm install next-elastic-carousel</code>
    //       </div>

    //       <h2>Import</h2>
    //       <div className={styles.code}>
    //         <code>{`import Carousel from 'next-elastic-carousel'`}</code>
    //       </div>

    //       <div className={styles.carousel_wrapper}>
    //         <div className={styles.carousel_container}>
    //           <div className={styles.live_preview}>
    //             <NextElasticCarousel
    //               //isRTL
    //               renderLoading={<Loading />}
    //               itemHeight={280}
    //               ref={carouselRef}
    //               //className={'carousel-custom'}
    //               //verticalMode={true}
    //               slideSpacing={16}
    //               //arrowsInside={true}
    //               showArrows={true}
    //               pagination={true}
    //               itemsToShow={1}
    //               itemsToScroll={1}
    //               enableAutoPlay={enableAutoPlay}
    //               autoPlaySpeed={autoPlaySpeed}
    //               onNextEnd={({ index }: { index: any }) => {
    //                 if (enableAutoPlay) {
    //                   clearTimeout(resetTimeout)
    //                   if (index + 1 === items.length) {
    //                     resetTimeout = setTimeout(() => {
    //                       if (carouselRef?.current) carouselRef.current.goTo(0)
    //                     }, autoPlaySpeed) // same time
    //                   }
    //                 }
    //               }}
    //             >
    //               {items.map((item) => (
    //                 <div key={item.id} className={styles.card}>
    //                   {item.title}
    //                 </div>
    //               ))}
    //             </NextElasticCarousel>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}

// const Loading = () => {
//   return <div className={styles.loading}>Um momento...</div>
// }
