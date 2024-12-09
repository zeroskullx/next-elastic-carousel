import React from 'react'
import PropTypes from 'prop-types'

import { cssPrefix } from '../../utils/helpers'
import { Button } from '../styled'
import { LeftIcon } from './Left.icon'
import { RightIcon } from './Right.icon'
import ArrowWrapper from './ArrowWrapper'

const directionIcons = {
  left: <LeftIcon />,
  right: <RightIcon />,
  up: <LeftIcon />,
  down: <RightIcon />,
}

const arrowClassname = 'arrow'

const rotateStyle = (direction) => {
  let rotate = {}
  if (direction === Arrow.up || direction === Arrow.down) {
    rotate.transform = 'rotate(90deg)'
  }
  return rotate
}
const Arrow = ({
  direction,
  onClick,
  icons,
  style,
  itemHeight,
  arrowsInside,
  ...rest
}) => {
  const arrows = { ...directionIcons, ...icons }
  const styleObj = {
    ...rotateStyle(direction),
    ...style,
  }

  return (
    <ArrowWrapper
      className={cssPrefix('arrow', `${arrowClassname}-${direction}`)}
      direction={direction}
      itemHight={itemHeight}
      arrowsInside={arrowsInside}
    >
      <Button
        tabIndex={0}
        onClick={onClick}
        className={cssPrefix(`${arrowClassname}-button-${direction}`)}
        style={styleObj}
        {...rest}
      >
        {arrows[direction]}
      </Button>
    </ArrowWrapper>
  )
}

Arrow.left = 'left'
Arrow.right = 'right'
Arrow.up = 'up'
Arrow.down = 'down'

Arrow.propTypes = {
  direction: PropTypes.oneOf(['left', 'right', 'up', 'down']).isRequired,
  icons: PropTypes.object,
  style: PropTypes.object,
  onClick: PropTypes.func,
  itemHeight: PropTypes.number,
  arrowsInside: PropTypes.bool,
}

export default Arrow
