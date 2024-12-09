/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'

const SliderContainer = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  margin: ${(props) => (props.arrowsInside ? 0 : '0 8px')};
`

export default SliderContainer
