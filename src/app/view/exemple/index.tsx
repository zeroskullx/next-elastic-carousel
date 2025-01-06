'use client'

import clsx from 'clsx'

import s from './styles.module.scss'
import { ItemToScrollCarousel } from './carousel/ItemToScroll'
import { ArrowsCarousel } from './carousel/Arrows'
import { Divider } from '@/app/components/Divider'
import { VerticalModeCarousel } from './carousel/VerticalMode'
import { IsRTLCarousel } from './carousel/IsRTL'
import { EasingCarousel } from './carousel/Easing'
import dataContent from '../../data/exempleContent.json'

export function ExemplePage() {
  return (
    <div>
      <h1 className="title_h1">Exemplo</h1>
      <p className="sub_title">
        Install Material UI, the world's most popular React UI framework.
      </p>

      <h3 id={dataContent.arrowsToShow.id} className="title_h3">
        Arrows To Show
      </h3>
      <p className="text" style={{ marginBottom: '1rem' }}>
        Vamos iniciar com um exemplo simples de um carousel com setas para e
        como usar o 'arrowsInside', 'showArrows', 'renderArrow' e o
        disableArrowsOnEnd
      </p>
      <ArrowsCarousel />

      <Divider style={{ marginTop: '2rem', marginBottom: '2rem' }} />

      <h3 id={dataContent.ItemToScroll.id} className="title_h3">
        Item To Scroll
      </h3>
      <p className="text" style={{ marginBottom: '1rem' }}>
        Slides To Scroll inicia com 1 item para poder renderiza em tela, porem
        você pode ajustar esse valor conforme a sua necessidade. Aqui vamos
        montar um exemplo usando o os paramentos itemsToShow para controlar a
        quantidade de itens mostrado dentro do carousel e itemsToScroll
        quantidade de itens para deslizar. No exemplo abaixo usaremos
        itemsToShow = 2 e itemsToScroll = 2. E para da um espacinho entre os
        itens vamos usar o slideSpacing = 8. O uso do slideSpacing é opcional e
        você pode estilizar o espaço diretamente no seu item.
      </p>
      <ItemToScrollCarousel />

      <Divider style={{ marginTop: '2rem', marginBottom: '2rem' }} />

      <h3 id={dataContent.VerticalMode.id} className="title_h3">
        Vertical Mode
      </h3>
      <p className="text" style={{ marginBottom: '1rem' }}>
        Exibir e animar o carrossel em um layout vertical
      </p>
      <VerticalModeCarousel />

      <Divider style={{ marginTop: '2rem', marginBottom: '2rem' }} />

      <h3 id={dataContent.IsRightToLeft.id} className="title_h3">
        Is Right To Left?
      </h3>
      <p className="text" style={{ marginBottom: '1rem' }}>
        Suporte para layouts da direita para a esquerda
      </p>
      <IsRTLCarousel />

      <Divider style={{ marginTop: '2rem', marginBottom: '2rem' }} />

      <h3 id={dataContent.easing.id} className="title_h3">
        Easing
      </h3>
      <p className="text" style={{ marginBottom: '1rem' }}>
        Você pode passar um padrão de suavização para as animações do seu
        carrossel, para mais infamações sobre cubic-bezier() visite o site{' '}
        <a
          className="link"
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function/cubic-bezier"
          target="_blank"
        >
          developer.mozilla.org
        </a>
      </p>
      <EasingCarousel />
    </div>
  )
}
