import React from 'react';
import { render } from '@testing-library/react';
import Dot from '../Dot';

describe('Alert', () => {
  it('Renders without crashing', () => {
    const { container } = render(
      <Dot />
    )
    expect(container).toBeTruthy()
  })
})
