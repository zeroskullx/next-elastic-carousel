import styled from '@emotion/styled'

const CarouselWrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  direction: ${({ isRTL }) => (isRTL ? 'rtl' : 'ltr')};
  height: ${(props) => props.size?.height};
  overflow: ${(props) => props.overflow};
`

export default CarouselWrapperDiv
