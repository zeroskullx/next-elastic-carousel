/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'

import * as React from 'react'

const calcLeft = ({
  isRTL,
  verticalMode,
  isSwiping,
  swipedSliderPosition,
  sliderPosition,
}) => {
  if (verticalMode || isRTL) {
    return 'auto'
  } else {
    return `${isSwiping ? swipedSliderPosition : sliderPosition}px`
  }
}

const calcRight = ({
  isRTL,
  verticalMode,
  isSwiping,
  swipedSliderPosition,
  sliderPosition,
}) => {
  if (!verticalMode && isRTL) {
    return `${isSwiping ? swipedSliderPosition : sliderPosition}px`
  } else {
    return 'auto'
  }
}

const calcTop = ({
  verticalMode,
  isSwiping,
  swipedSliderPosition,
  sliderPosition,
}) => {
  if (!verticalMode) {
    return 'auto'
  } else {
    return `${isSwiping ? swipedSliderPosition : sliderPosition}px`
  }
}

const calcTransition = ({ isSwiping, transitionMs, easing, tiltEasing }) => {
  const duration = isSwiping ? 0 : transitionMs
  const effectiveEasing = isSwiping ? tiltEasing : easing
  return `all ${duration}ms ${effectiveEasing}`
}

const calcSlideSpacing = ({ slideSpacing, currentItem, verticalMode }) => {
  if (verticalMode) {
    return slideSpacing
  }
  return slideSpacing * currentItem + slideSpacing
}

const SliderContainer = styled.div((props) => ({
  position: 'absolute',
  display: 'flex',
  flexDirection: props.verticalMode ? 'column' : 'row',
  minHeight: props.verticalMode ? '100%' : '',
}))

const Slider = React.forwardRef((props, ref) => {
  const { children, slideSpacing, activePage, verticalMode, ...rest } = props

  const _activePage = calcSlideSpacing({
    verticalMode,
    slideSpacing,
    currentItem: props.currentItem,
  })

  return (
    <SliderContainer
      ref={ref}
      style={{
        transition: calcTransition(props),
        left: calcLeft(props),
        right: calcRight(props),
        top: calcTop(props),
        marginLeft: verticalMode ? '' : `-${_activePage}px`,
        marginTop: verticalMode ? `-${_activePage}px` : '',
      }}
      verticalMode={verticalMode}
      {...rest}
    >
      {children}
    </SliderContainer>
  )
})

export default Slider
