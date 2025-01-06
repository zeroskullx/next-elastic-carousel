import * as React from 'react'
import styled from '@emotion/styled'

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

const SliderContainer = styled.div((props) => ({
  position: 'absolute',
  display: 'flex',
  flexDirection: props.verticalMode ? 'column' : 'row',
  minHeight: props.verticalMode ? '100%' : '',
}))

const Slider = React.forwardRef((props, ref) => {
  const { children, activePage, verticalMode, ...rest } = props

  return (
    <SliderContainer
      ref={ref}
      style={{
        transition: calcTransition(props),
        left: calcLeft(props),
        right: calcRight(props),
        top: calcTop(props),
      }}
      verticalMode={verticalMode}
      {...rest}
    >
      {children}
    </SliderContainer>
  )
})

export default Slider
