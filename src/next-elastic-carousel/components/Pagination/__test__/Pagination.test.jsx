import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Pagination from '../Pagination'

describe('Pagination Component', () => {
  const numOfPages = 5
  const activePage = 2
  const onClick = jest.fn()

  it('renders the correct number of Dot components', () => {
    const { getAllByRole } = render(
      <Pagination
        numOfPages={numOfPages}
        activePage={activePage}
        onClick={onClick}
      />
    )
    const dots = getAllByRole('button')
    expect(dots).toHaveLength(numOfPages)
  })

  it('sets the correct Dot as active', () => {
    const { getAllByRole } = render(
      <Pagination
        numOfPages={numOfPages}
        activePage={activePage}
        onClick={onClick}
      />
    )
    const dots = getAllByRole('button')
    expect(dots[activePage].classList).toContain('rec-dot_active')
  })

  it('calls onClick when a Dot is clicked', () => {
    const { getAllByRole } = render(
      <Pagination
        numOfPages={numOfPages}
        activePage={activePage}
        onClick={onClick}
      />
    )
    const dots = getAllByRole('button')
    fireEvent.click(dots[0])
    expect(onClick).toHaveBeenCalled()
  })
})
