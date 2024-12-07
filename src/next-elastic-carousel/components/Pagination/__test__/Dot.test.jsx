import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Dot from '../Dot'

describe('Dot', () => {
  it('Renders without crashing', () => {
    const { container } = render(<Dot />)
    expect(container).toBeTruthy()
  })

  it('Calls onClick handler when clicked', () => {
    const handleClick = jest.fn()
    const { getByRole } = render(<Dot onClick={handleClick} />)
    const dot = getByRole('button')
    fireEvent.click(dot)
    expect(handleClick).toHaveBeenCalled()
  })

  it('Applies active styles when active prop is true', () => {
    const { getByRole } = render(<Dot active={true} />)
    const dot = getByRole('button')
    expect(dot).toHaveClass('rec-dot_active')
  })

  it('Applies hover styles when hovered', () => {
    const { getByRole } = render(<Dot active={false} />)
    const dot = getByRole('button')
    fireEvent.mouseOver(dot)
    expect(dot).toHaveStyle({ boxShadow: '0 0 1px 3px rgba(103,58,183,.5)' })
  })
})
