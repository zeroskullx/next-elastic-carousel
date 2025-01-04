import styled from '@emotion/styled'

const ArrowWrapper = styled.div`
  position: ${(props) => (props.arrowsInside ? 'absolute' : '')};
  display: flex;
  flex-wrap: wrap;
  left: ${(props) =>
    props.arrowsInside &&
    (props.direction === 'left' || props.direction === 'up') &&
    '4px'};
  right: ${(props) =>
    props.arrowsInside &&
    (props.direction === 'right' || props.direction === 'down') &&
    '4px'};
  height: ${(props) => `${props.itemHight}px`};
  z-index: 2;
`

export default ArrowWrapper
