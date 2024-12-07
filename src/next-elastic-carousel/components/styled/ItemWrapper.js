/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { cssPrefix } from '../../utils/helpers'
import consts from '../../constants'

const ItemWrapperContent = styled('div', {
  shouldForwardProp: (prop) => prop !== 'itemposition',
})(({ itemposition, style }) => ({
  boxSizing: 'border-box',
  display: 'flex',
  overflow: 'hidden',
  userSelect: 'none',
  justifyContent: itemposition,
  ...style, // Adiciona estilos dinamicamente
}))

function ItemWrapper({
  itemPosition = consts.START,
  children,
  style = {},
  idx,
  onItemClick,
}) {
  return (
    <ItemWrapperContent
      id={idx}
      key={idx}
      style={style}
      className={cssPrefix('item-wrapper')}
      itemposition={itemPosition}
      onClick={onItemClick}
    >
      {children}
    </ItemWrapperContent>
  )
}

ItemWrapper.propTypes = {
  children: PropTypes.element.isRequired,
  style: PropTypes.object,
  itemPosition: PropTypes.oneOf([consts.START, consts.CENTER, consts.END]),
}

export default ItemWrapper
