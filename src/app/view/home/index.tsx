'use client'

import clsx from 'clsx'
import { useState } from 'react'

import s from './styles.module.scss'
import { MarkdownCode } from '@/app/components/Markdown'
import { BasicCarousel } from './BasicCarousel'
import { Divider } from '@/app/components/Divider'
import { Collapse } from '@/app/components/Collapse'
import { ChevronDown } from '@/app/assets/Chevron-down'
import data from '@/app/data/carouselProps.json'
// import {  } from './Table' //TODO: Table to be implemented in the future

export function HomePage() {
  const [isOpenAll, setIsOpenAll] = useState(false)

  const _install = `
  \`\`\`bash
    pnpm i next-elastic-carousel
  \`\`\`
  `

  const _import = `
  \`\`\`bash
    import NextElasticCarousel from 'next-elastic-carousel'
  \`\`\`
  `

  const _basicCarousel = `
import NextElasticCarousel from 'next-elastic-carousel'

export function BasicCarousel() {
  const items = [
    { id: 1, title: 'Page 1' },
    { id: 2, title: 'Page 2' },
    { id: 3, title: 'Page 3' },
    { id: 4, title: 'Page 4' },
    { id: 5, title: 'Page 5' },
  ]

  return (
    <NextElasticCarousel>
      {items.map((item) => (
        <div
          style={{
            width: '100%',
            padding: '4rem',
            backgroundColor: '#fbf3ff',
            border: '1px solid #66167e',
            borderRadius: '.5rem',
          }}
          key={item.id}
        >
          {item.title}
        </div>
      ))}
    </NextElasticCarousel>
  )}
  `

  const _basic = `
  \`\`\`tsx
     ${_basicCarousel}
  \`\`\`
  `

  return (
    <div className={s.main_root}>
      <h1 className="title_h1">Getting started</h1>
      <p className="sub_title">
        Install Material UI, the world's most popular React UI framework.
      </p>

      {/* <h3 className="title_h3">Carousel</h3>
      <p className="text">
        Carousel is a content slider featuring various customization options.
      </p> */}

      <h3 id="install" className="title_h3">
        Install
      </h3>
      <MarkdownCode
        markdown={_install}
        copy={{ value: 'pnpm i next-elastic-carousel' }}
        className={s.mb_1_5}
      />

      <h3 id="import" className="title_h3">
        Import
      </h3>
      <MarkdownCode
        markdown={_import}
        copy={{
          value: "import NextElasticCarousel from 'next-elastic-carousel'",
        }}
        className={s.mb_1_5}
      />

      <h3 id="basic" className="title_h3">
        Basic
      </h3>
      <p className="text" style={{ marginBottom: '1rem' }}>
        Carousel requires a collection of items as its value along with a
        template to render each item.
      </p>
      <BasicCarousel />

      <Divider />

      <h3 id="code" style={{ marginTop: '1.5rem' }} className="title_h3">
        Code
      </h3>
      <p className="text" style={{ marginBottom: '1rem' }}>
        Com poucas linhas de código você já tem um carrousel funcionado
      </p>
      <MarkdownCode
        markdown={_basic}
        copy={{ value: _basicCarousel }}
        className={s.mb_1_5}
      />

      <div id="props" className={s.collapse_bar_title}>
        <h3 className="title_h3">Props</h3>
        <div
          className={clsx(s.collapse_view_button, isOpenAll ? s.open : '')}
          onClick={() => setIsOpenAll((prev) => !prev)}
        >
          View: {isOpenAll ? 'Expanded' : 'Collapsed'} <ChevronDown />
        </div>
      </div>
      <p className="text">Props of the native component are also available.</p>

      <div className={s.collapse_content}>
        {data
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((item, index) => (
            <Collapse
              key={index}
              title={item.name}
              initOpen={isOpenAll}
              subTitle={item?.isRequired ? '[ required ]' : ''}
            >
              <div className={s.collapse_meta}>
                <p>
                  <span>Type:</span>
                  <code>{item.type}</code>
                </p>
                {item.default && (
                  <p>
                    <span>Default:</span>
                    <span>{item.default}</span>
                  </p>
                )}
                <p>
                  <span>Description:</span>
                  <span>{item.description}</span>
                </p>
              </div>
            </Collapse>
          ))}
      </div>

      {/* <CarouselProps /> */}
    </div>
  )
}
