import React from 'react'
import { render } from '@testing-library/react'
import Only from '../index'

describe('Only Component', () => {
  const ChildComponent = (props) => <div {...props}>Child Component</div>

  it('renders the child when "when" is true', () => {
    const { getByText } = render(
      <Only when={true}>
        <ChildComponent />
      </Only>
    )
    expect(getByText('Child Component')).toBeInTheDocument()
  })

  it('does not render the child when "when" is false and hiddenMode is "withNull"', () => {
    const { queryByText } = render(
      <Only when={false} hiddenMode="withNull">
        <ChildComponent />
      </Only>
    )
    expect(queryByText('Child Component')).not.toBeInTheDocument()
  })

  it('renders the child with display:none when "when" is false and hiddenMode is "withDisplay"', () => {
    const { getByText } = render(
      <Only when={false} hiddenMode="withDisplay">
        <ChildComponent />
      </Only>
    )
    expect(getByText('Child Component')).toHaveStyle('display: none')
  })

  it('renders the child with visibility:hidden when "when" is false and hiddenMode is "withVisibility"', () => {
    const { getByText } = render(
      <Only when={false} hiddenMode="withVisibility">
        <ChildComponent />
      </Only>
    )
    expect(getByText('Child Component')).toHaveStyle('visibility: hidden')
  })

  it('renders the child with custom class when "when" is false and hiddenMode is "withCss"', () => {
    const { getByText } = render(
      <Only when={false} hiddenMode="withCss" className="custom-hidden-class">
        <ChildComponent />
      </Only>
    )
    expect(getByText('Child Component')).toHaveClass('custom-hidden-class')
  })
})
