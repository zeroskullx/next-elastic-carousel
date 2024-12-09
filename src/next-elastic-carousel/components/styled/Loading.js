import styled from '@emotion/styled'

export default styled.div`
  width: 100%;
  display: flex;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  height: ${(props) =>
    props.verticalMode
      ? props.itemsToShow * props.size?.height
      : props.size?.height}px;
`
