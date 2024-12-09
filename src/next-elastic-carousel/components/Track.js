import React from 'react'
import PropTypes from 'prop-types'
import { useSwipeable } from 'react-swipeable'

import { cssPrefix } from '../utils/helpers'
import ItemWrapperContainer from './ItemWrapperContainer'

const Track = ({
  children,
  childWidth,
  autoTabIndexVisibleItems,
  enableSwipe,
  enableMouseSwipe,
  preventDefaultTouchmoveEvent,
  itemsToShow,
  itemsToScroll,
  currentItem,
  itemPosition,
  slideSpacing,
  onSwiped,
  onSwiping,
  verticalMode,
  onItemClick,
}) => {
  const width = `${childWidth}px`
  //const paddingStyle = '' //`${itemPadding?.join('px ')}px`
  const minVisibleItem = currentItem
  const maxVisibleItem = currentItem + itemsToShow
  const prevItem = minVisibleItem - itemsToScroll
  const nextItem = maxVisibleItem + itemsToScroll

  const originalChildren = React.Children.map(children, (child, idx) => {
    const isVisible = idx >= minVisibleItem && idx < maxVisibleItem
    const isPrevItem = !isVisible && idx >= prevItem && idx < currentItem
    const isNextItem = !isVisible && idx < nextItem && idx > currentItem
    const itemClass = 'carousel-item'

    const childToRender = autoTabIndexVisibleItems
      ? React.cloneElement(child, {
          tabIndex: isVisible ? 0 : -1,
        })
      : child

    return (
      <div
        className={cssPrefix(
          itemClass,
          `${itemClass}-${idx}`,
          `${itemClass}-${isVisible ? 'visible' : 'hidden'}`,
          isPrevItem && `${itemClass}-prev`,
          isNextItem && `${itemClass}-next`
        )}
        //Aqui é onde o padding é aplicado
        style={{
          paddingLeft: verticalMode ? '' : `${slideSpacing}px`,
          paddingTop: verticalMode ? `${slideSpacing}px` : '',
        }}
      >
        <ItemWrapperContainer
          id={idx}
          itemPosition={itemPosition}
          style={{ width }}
          key={idx}
          onClick={onItemClick}
        >
          {childToRender}
        </ItemWrapperContainer>
      </div>
    )
  })

  const handlers = useSwipeable({
    stopPropagation: true,
    preventDefaultTouchmoveEvent: preventDefaultTouchmoveEvent,
    trackMouse: enableMouseSwipe,
    onSwiped: onSwiped,
    onSwiping: onSwiping,
    //className: cssPrefix('swipable'),

    enableMouseSwipe: enableMouseSwipe,
    enableSwipe: enableSwipe,
  })

  const toRender = enableSwipe ? (
    <div
      className={cssPrefix('swipable')}
      style={{
        display: 'flex',
        flexDirection: verticalMode ? 'column' : 'row',
      }}
      {...handlers}
    >
      {originalChildren}
    </div>
  ) : (
    originalChildren
  )
  return toRender
}

Track.propTypes = {
  children: PropTypes.array.isRequired,
  itemsToShow: PropTypes.number.isRequired,
  noAutoTabbedItems: PropTypes.bool,
  currentItem: PropTypes.number.isRequired,
  itemPosition: PropTypes.string,
  childWidth: PropTypes.number,
  verticalMode: PropTypes.bool,
  enableSwipe: PropTypes.bool,
  enableMouseSwipe: PropTypes.bool,
  preventDefaultTouchmoveEvent: PropTypes.bool,
  onSwiped: PropTypes.func,
  onSwiping: PropTypes.func,
  onItemClick: PropTypes.func,
  slideSpacing: PropTypes.number,
}

export default Track
