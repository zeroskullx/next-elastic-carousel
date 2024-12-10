import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

/**
 * Run a single snapshot test.
 *
 * @param {*} element the element to render
 * @param {*} name the name of the test
 */
export function snapshot(element, name) {
  test(name, () => {
    expect(render(element).container).toMatchSnapshot()
  })
}
