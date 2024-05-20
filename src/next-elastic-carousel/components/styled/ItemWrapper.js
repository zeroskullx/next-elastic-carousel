import styled, { StyleSheetManager } from "styled-components";
import PropTypes from "prop-types";
import { cssPrefix } from "../../utils/helpers";
import consts from "../../consts";

const ItemWrapper = styled.div.attrs(({ style }) => ({
  style,
  className: cssPrefix("item-wrapper xxx")
}))`
  box-sizing: border-box;
  display: flex;
  overflow: hidden;
  user-select: none;
  justify-content: ${({ itemposition }) => itemposition};
`;

ItemWrapper.defaultProps = {
  style: {},
  itemposition: consts.CENTER
};

ItemWrapper.propTypes = {
  children: PropTypes.element.isRequired,
  style: PropTypes.object,
  itemPosition: PropTypes.oneOf([consts.START, consts.CENTER, consts.END])
};



export default function ItemWrapperContainer({ itemPosition, children, style, idx, onItemClick }) {

  return <StyleSheetManager shouldForwardProp={(prop) => prop !== 'itemPosition'}>
    <ItemWrapper
      id={idx}
      itemPosition={itemPosition}
      style={style}
      key={idx}
      onClick={onItemClick}
    >
      {children}
    </ItemWrapper>
  </StyleSheetManager>
}
