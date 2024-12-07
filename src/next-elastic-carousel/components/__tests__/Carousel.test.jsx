import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import Carousel from '../Carousel'
import { numberToArray } from '../../utils/helpers'
import { Pagination } from '../Pagination'

describe('Carousel - public API (props)', () => {
  const CustomPagination = () => <div data-testid="render_pagination">test</div>

  const Items = numberToArray(5).map((i) => (
    <div className="test-child" key={i}>
      {i}
    </div>
  ))

  it('renders without crashing', () => {
    render(<Carousel>{Items}</Carousel>)
  })

  it('renders children', () => {
    const { container } = render(<Carousel>{Items}</Carousel>)
    const children = container.querySelectorAll('.test-child') // Usando querySelectorAll aqui
    expect(children.length).toBe(Items.length)
  })

  it("one child won't break on next", () => {
    // Renderizando o componente com apenas um item
    const { container } = render(<Carousel>{Items[0]}</Carousel>)

    // Encontrando o botão "next" usando a classe "rec-arrow-right"
    const nextButton = container.querySelector('button.rec-arrow-right')

    // Verifique se o botão foi encontrado
    expect(nextButton).toBeInTheDocument()

    // Simulando o clique no botão "next"
    fireEvent.click(nextButton)

    // Adicione uma asserção aqui para garantir que o comportamento esperado ocorre após o clique
    // Por exemplo: verificar se a navegação ocorreu corretamente
    expect(nextButton).toBeInTheDocument() // Pode ser ajustado conforme o comportamento esperado
  })

  it('renders with className in root', () => {
    const testClassName = 'test-root'
    const { container } = render(
      <Carousel className={testClassName}>{Items}</Carousel>
    )
    const carousel = container.querySelector(`.${testClassName}`) // Usando querySelector aqui
    expect(carousel).toHaveClass(testClassName)
  })

  it('renders with style in root', () => {
    const styleToRender = { position: 'fixed' }
    const { container } = render(
      <Carousel style={styleToRender}>{Items}</Carousel>
    )

    // Pega o elemento raiz do container
    const carousel = container.firstChild

    // Verifica se o estilo foi aplicado corretamente
    expect(carousel).toHaveStyle('position: fixed')
  })

  it('renders with verticalMode set to true', () => {
    const { container } = render(
      <Carousel verticalMode={true}>{Items}</Carousel>
    )
    const slider = container.querySelector(`.rec-slider`)
    expect(slider).toHaveStyle('flex-direction: column')
  })

  it('isRTL prop is passed to Slider and styles are applied correctly', () => {
    // Teste para isRTL = true
    const { container: containerRTL } = render(
      <Carousel isRTL={true}>{Items}</Carousel>
    )
    const sliderRTL = containerRTL.querySelector(`.rec-slider`)

    expect(sliderRTL).toHaveStyle({
      left: 'auto',
      right: '0px',
    })

    // Teste para isRTL = false
    const { container: containerLTR } = render(
      <Carousel isRTL={false}>{Items}</Carousel>
    )
    const sliderLTR = containerLTR.querySelector(`.rec-slider`)

    expect(sliderLTR).toHaveStyle({
      left: '0px',
      right: 'auto',
    })
  })

  it('wont break with outerSpacing', () => {
    const { container } = render(
      <Carousel outerSpacing={100}>{Items}</Carousel>
    )
    const carousel = container.querySelector('.rec-carousel')
    expect(carousel).toBeInTheDocument()
  })
})

describe('Carousel - public CSS classnames', () => {
  const publicClasses = [
    'carousel-wrapper',
    'carousel',
    'slider-container',
    'slider',
    'carousel-item',
    'carousel-item-visible',
    'carousel-item-hidden',
    'carousel-item-prev',
    'carousel-item-next',
    'item-wrapper',
    'arrow',
    'swipable',
    //'dot',
    //'dot_active',
    //'pagination',
  ]
  const prefix = 'rec'
  const Items = numberToArray(5).map((i) => (
    <div className="test-child" key={i}>
      {i}
    </div>
  ))

  publicClasses.forEach((className) => {
    const withPrefix = `${prefix}-${className}`

    it(`renders ${withPrefix}`, () => {
      const { container } = render(
        <Carousel
          pagination={true}
          initialActiveIndex={1}
          itemsToShow={1}
          enableSwipe={true}
        >
          {Items}
        </Carousel>
      )

      const elementWithClass = container.querySelector(`.${withPrefix}`) // Assuming you've added data-testid to the elements

      expect(elementWithClass).toBeInTheDocument()
    })
  })
})
