import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import Carousel from '../Carousel'
import { numberToArray } from '../../utils/helpers'

describe('Carousel - public', () => {
  const Items = numberToArray(3).map((i) => (
    <div className="test-child" key={i}>
      Item {i + 1}
    </div>
  ))

  it('Renders without crashing', () => {
    const { container } = render(<Carousel>{Items}</Carousel>)
    expect(container).toBeTruthy()
  })

  it('renders children', () => {
    render(<Carousel>{Items}</Carousel>)

    const item1 = screen.getByText('Item 1')
    expect(item1).toBeInTheDocument()

    const item2 = screen.getByText('Item 2')
    expect(item2).toBeInTheDocument()

    const item3 = screen.getByText('Item 3')
    expect(item3).toBeInTheDocument()
  })

  it('wont break when click in next', () => {
    render(<Carousel>{Items}</Carousel>)

    const button = screen.getAllByRole('button')
    fireEvent.click(button[0])
  })

  it('renders with className in root', () => {
    const testClassName = 'test-root'
    const { container } = render(
      <Carousel className={testClassName}>{Items}</Carousel>
    )
    const containerElement = container.querySelector(`.${testClassName}`)
    expect(containerElement).toHaveClass(testClassName)
  })
})
