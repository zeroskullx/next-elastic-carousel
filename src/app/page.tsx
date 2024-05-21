'use client'

import Image from "next/image";
import styles from "./page.module.scss";

import { useRef } from "react";
import ElasticCarousel from "@/next-elastic-carousel";

export default function Home() {

  const carouselRef = useRef<any>(null)
  let resetTimeout: any
  const enableAutoPlay = true
  const autoPlaySpeed = 333000
  const totalPages = 3

  return (
    <main className={styles.main}>

      <ElasticCarousel
        ref={carouselRef}
        className={'carousel-custom'}
        isRTL={false}
        showArrows={false}
        pagination={true}
        itemsToShow={1}
        itemsToScroll={1}
        enableAutoPlay={enableAutoPlay}
        autoPlaySpeed={autoPlaySpeed}
        onNextEnd={({ index }: { index: any }) => {
          if (enableAutoPlay) {
            clearTimeout(resetTimeout)
            if (index + 1 === totalPages) {
              resetTimeout = setTimeout(() => {
                if (carouselRef?.current) carouselRef.current.goTo(0)
              }, autoPlaySpeed) // same time
            }
          }
        }}
      >
        <div>Page 1</div>
        <div>Page 2</div>
        <div>Page 3</div>
        <div>Page 4</div>
      </ElasticCarousel>

      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
