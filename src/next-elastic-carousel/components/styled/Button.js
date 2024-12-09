import styled from '@emotion/styled'

const primaryColor = 'rgba(103, 58, 183, 1)'
const backgroundColor = '#fdfdfd'
const boxShadowColor = 'rgba(103, 58, 183, 0.8)'
const hoverBoxShadowColor = 'rgb(190 153 255)'

const disabledColor = 'rgba(103, 58, 183, .58)'
const disabledBackgroundColor = 'rgba(247, 247, 247, .48)'
const disabledBoxShadowColor = '#ebebeb'

export default styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  color: ${(props) => (props.disabled ? disabledColor : primaryColor)};
  border-radius: 50%;
  border: none;
  padding: 0;
  width: 2rem;
  height: 2rem;
  min-width: 2rem;
  outline: none;
  box-sizing: border-box;

  transition: all 0.175s ease;
  cursor: pointer;
  box-shadow: 0 0 3px 0px ${boxShadowColor};
  background-color: ${backgroundColor};
  &:hover:enabled,
  &:focus:enabled {
    color: #fff;
    background-color: ${primaryColor};
    box-shadow: 0 0 6px 0 ${hoverBoxShadowColor};
  }
  &:disabled {
    cursor: not-allowed;
    background-color: ${disabledBackgroundColor};
    box-shadow: 0 0 3px 0 ${disabledBoxShadowColor};
  }
`
