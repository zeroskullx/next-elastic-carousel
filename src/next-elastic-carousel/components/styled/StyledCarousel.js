// import styled from '@emotion/styled'

// export default styled.div.attrs((props) => ({
//   style: {
//     height: props.size.height,
//     opacity: props.opacity,
//   },
// }))`
//   display: flex;
//   flex-direction: row;
//   width: 100%;
// `

import styled from '@emotion/styled'

// Define o componente com props dinâmicos no estilo
const StyledCarousel = styled.div`
  display: flex;
  flex-direction: row;
  width: ${(props) => props.size?.width};
  height: ${(props) => props.size?.height + 'px'};
  opacity: ${(props) => props.opacity};
  overflow: ${(props) => props.overflow};
  transition: all 0.2s ease-in-out;
`

export default StyledCarousel
