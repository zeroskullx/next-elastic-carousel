import React, { Children } from 'react'
import PropTypes from 'prop-types'
import ResizeObserver from 'resize-observer-polyfill'

import Only from './OnlyWhen'
import Track from './Track'
import Arrow from './Arrow'
import consts from '../constants'
import { activeIndexReducer } from '../reducers/items'
import { nextItemAction, prevItemAction } from '../actions/itemsActions'
import {
  SliderContainer,
  Slider,
  StyledCarousel,
  CarouselWrapper,
  Loading,
} from './styled'
import { pipe, noop, cssPrefix, numberToArray } from '../utils/helpers'
import { Pagination } from './Pagination'

class Carousel extends React.Component {
  isComponentMounted = false
  isHoverActive = false

  state = {
    rootHeight: 0,
    childHeight: 0,
    sliderPosition: 0,
    swipedSliderPosition: 0,
    isSwiping: false,
    transitioning: false,
    transitionMs: this.props.transitionMs,
    activeIndex: this.props.initialActiveIndex || this.props.initialFirstItem, // support deprecated  initialFirstItem
    pages: [],
    activePage: 0,
    sliderContainerWidth: 0,
  }

  componentDidMount() {
    this.isComponentMounted = true
    this.initResizeObserver()
    this.updateActivePage()
    this.setPages()
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log('componentDidUpdate', prevProps, prevState)

    const {
      enableAutoPlay,
      children,
      itemsToShow,
      itemsToScroll,
      breakPoints,
    } = this.props
    const { activeIndex, sliderContainerWidth } = this.state
    const nextItem = this.getNextItemIndex(activeIndex, false)
    const currentChildrenLength = Children.toArray(children).length
    const prevChildrenLength = Children.toArray(prevProps.children).length
    // update pages (for pagination)
    if (
      prevChildrenLength !== currentChildrenLength ||
      prevProps.itemsToShow !== itemsToShow ||
      prevProps.itemsToScroll !== itemsToScroll ||
      prevProps.breakPoints !== breakPoints ||
      sliderContainerWidth !== prevState.sliderContainerWidth
    ) {
      // we mimic a container resize to recalculate item width when itemsToShow are updated
      this.onContainerResize({ contentRect: { width: sliderContainerWidth } })
      this.setPages()
      this.updateActivePage()
    }

    // autoplay update
    if (activeIndex === nextItem) {
      this.removeAutoPlay()
    } else if (enableAutoPlay && !this.autoPlayIntervalId) {
      this.setAutoPlay()
    } else if (!enableAutoPlay && this.autoPlayIntervalId) {
      this.removeAutoPlay()
    }

    if (prevChildrenLength !== currentChildrenLength) {
      const { itemsToShow: calculatedItemsToShow } =
        this.getDerivedPropsFromBreakPoint()
      // number of items is reduced (we don't care if number of items is increased)
      // we need to check if our current index is not out of boundaries
      // we need to include itemsToShow so we can fill up the slots
      const lastIndex = currentChildrenLength - 1
      const isOutOfRange = activeIndex + calculatedItemsToShow > lastIndex
      if (isOutOfRange) {
        // we are out of boundaries, go "back" to last item of the list (respect itemsToShow)
        this.goTo(
          Math.max(0, currentChildrenLength - calculatedItemsToShow),
          'componentDidUpdate'
        )
      }
    }
  }

  componentWillUnmount() {
    this.isComponentMounted = false
    this.removeAutoPlay()
    this.unSubscribeObserver()
  }

  setRef = (name) => (ref) => (this[name] = ref)

  initResizeObserver = () => {
    this.ro = new ResizeObserver((entries, observer) => {
      for (const entry of entries) {
        if (entry.target === this.sliderContainer) {
          // we are using rAF because it fixes the infinite refresh with gatsby (ssr?).
          // TBH, I'm not sure i fully understand why.
          // see https://github.com/sag1v/react-elastic-carousel/issues/107
          window.requestAnimationFrame(() => {
            this.onContainerResize(entry)
          })
        }
        if (entry.target === this.slider) {
          // we are using rAF because it fixes the infinite refresh with gatsby (ssr?).
          // TBH, I'm not sure i fully understand why
          // see https://github.com/sag1v/react-elastic-carousel/issues/107
          window.requestAnimationFrame(() => {
            this.onSliderResize(entry)
          })
        }
      }
    })
    this.ro.observe(this.sliderContainer)
    this.ro.observe(this.slider)
  }

  unSubscribeObserver = () => this.ro.disconnect()

  setAutoPlay = () => {
    const { autoPlaySpeed } = this.getDerivedPropsFromBreakPoint()
    this.autoPlayIntervalId = setInterval(() => {
      if (this.isComponentMounted) {
        const { transitioning } = this.state
        if (!transitioning) {
          this.slideNext()
        }
      }
    }, autoPlaySpeed)
  }

  removeAutoPlay = () => {
    if (this.autoPlayIntervalId) {
      clearInterval(this.autoPlayIntervalId)
      this.autoPlayIntervalId = null
    }
  }

  setPages = () => {
    const numOfPages = this.getNumOfPages()
    const pages = numberToArray(numOfPages)
    this.setState({ pages })
  }

  onSliderTransitionEnd = (fn) => {
    this.slider.addEventListener('transitionend', fn)
  }

  removeSliderTransitionHook = (fn) => {
    this.slider.removeEventListener('transitionend', fn)
  }

  getDerivedPropsFromBreakPoint = () => {
    const { breakPoints, ...restOfProps } = this.props
    const { sliderContainerWidth } = this.state

    // default breakpoint from individual props
    let currentBreakPoint
    // if breakpoints were added as props override the individual props
    if (breakPoints && breakPoints.length > 0) {
      currentBreakPoint = breakPoints
        .slice() // no mutations
        .reverse() // so we can find last match
        .find((bp) => bp.width <= sliderContainerWidth)
      if (!currentBreakPoint) {
        /* in case we don't have a lower width than sliderContainerWidth
         * this mostly happens in initialization when sliderContainerWidth is 0
         */
        currentBreakPoint = breakPoints[0]
      }
    }
    // merge direct props with current breakpoint Props
    return { ...restOfProps, ...currentBreakPoint }
  }

  updateSliderPosition = () => {
    this.setState((state) => {
      const { children, verticalMode, itemsToShow, transitionMs } =
        this.getDerivedPropsFromBreakPoint()
      const { childHeight, activeIndex } = state

      const childWidth = this.calculateChildWidth()
      const totalItems = Children.toArray(children).length
      const hiddenSlots = totalItems - itemsToShow
      let moveBy = activeIndex * -1
      const emptySlots = itemsToShow - (totalItems - activeIndex)
      if (emptySlots > 0 && hiddenSlots > 0) {
        moveBy = emptySlots + activeIndex * -1
      }
      let sliderPosition = (verticalMode ? childHeight : childWidth) * moveBy
      const newActiveIndex =
        emptySlots > 0 ? activeIndex - emptySlots : activeIndex
      // go back from 0ms to whatever set by the user
      // We were at 0ms because we wanted to disable animation on resize
      // see https://github.com/sag1v/react-elastic-carousel/issues/94
      window.requestAnimationFrame(() => {
        if (this.isComponentMounted) {
          this.setState({ transitionMs })
        }
      })
      return {
        sliderPosition,
        activeIndex: newActiveIndex < 0 ? 0 : newActiveIndex,
      }
    })
  }

  onSliderResize = (sliderNode) => {
    if (!this.isComponentMounted) {
      return
    }

    const { verticalMode, children, itemsToShow, slideSpacing, itemHeight } =
      this.getDerivedPropsFromBreakPoint()
    const { height: sliderHeight } = sliderNode.contentRect
    const nextState = {}
    const childrenLength = Children.toArray(children).length
    if (verticalMode) {
      const childHeight = sliderHeight / childrenLength
      // We use Math.min because we don't want to make the child smaller
      // if the number of children is smaller than itemsToShow.
      // (Because we do not want "empty slots")
      nextState.rootHeight =
        childHeight * Math.min(childrenLength, itemsToShow) - slideSpacing
      nextState.childHeight = childHeight
    } else {
      nextState.rootHeight = itemHeight > 0 ? itemHeight : sliderHeight
    }
    this.setState(nextState)
  }

  calculateChildWidth = () => {
    const { sliderContainerWidth } = this.state
    const { verticalMode, itemsToShow, showEmptySlots, children } =
      this.getDerivedPropsFromBreakPoint()

    /* based on slider container's width, get num of items to show
     * and calculate child's width (and update it in state)
     */
    const childrenLength = Children.toArray(children).length || 1

    let childWidth = 0
    if (verticalMode) {
      childWidth = sliderContainerWidth
    } else {
      // When "showEmptySlots" is false
      // We use Math.min because we don't want to make the child smaller
      // if the number of children is smaller than itemsToShow.
      // (Because we do not want "empty slots")
      childWidth =
        sliderContainerWidth /
        (showEmptySlots ? itemsToShow : Math.min(childrenLength, itemsToShow))
    }

    return childWidth
  }

  onContainerResize = (sliderContainerNode) => {
    const { width: newSliderContainerWidth } = sliderContainerNode.contentRect
    // update slider container width
    // disable animation on resize see https://github.com/sag1v/react-elastic-carousel/issues/94
    const { outerSpacing, verticalMode: initialVerticalMode } =
      this.getDerivedPropsFromBreakPoint()
    const containerWidth =
      newSliderContainerWidth - (initialVerticalMode ? 0 : outerSpacing * 2)

    if (
      !this.isComponentMounted ||
      this.state.sliderContainerWidth === newSliderContainerWidth
    ) {
      // prevent infinite loop
      return
    }
    this.setState(
      { sliderContainerWidth: containerWidth, transitionMs: 0 },
      () => {
        // we must get these props inside setState (get future props because its async)
        const { onResize, itemsToShow, children } =
          this.getDerivedPropsFromBreakPoint()

        const childrenLength = Children.toArray(children).length || 1

        this.setState(
          (currentState) => {
            // We might need to change the selected index when the size of the container changes
            // we are making sure the selected index is not out of boundaries and respecting itemsToShow
            // This usually happens with breakpoints. see https://github.com/sag1v/react-elastic-carousel/issues/122
            let activeIndex = currentState.activeIndex
            // we take the lowest, in case itemsToShow is greater than childrenLength
            const maxItemsToShow = Math.min(childrenLength, itemsToShow)
            const endLimit = childrenLength - maxItemsToShow
            if (activeIndex > endLimit) {
              activeIndex = endLimit
            }

            return { activeIndex }
          },
          () => {
            /* Based on all of the above new data:
             * update slider position
             * get the new current breakpoint
             * pass the current breakpoint to the consumer's callback
             */
            this.updateSliderPosition()
            const currentBreakPoint = this.getDerivedPropsFromBreakPoint()
            onResize(currentBreakPoint)
          }
        )
      }
    )
  }

  tiltMovement = (position, distance = 20, duration = 150) => {
    this.setState((state) => {
      return {
        isSwiping: true,
        swipedSliderPosition: position - distance,
      }
    })
    setTimeout(() => {
      this.setState({
        isSwiping: false,
        swipedSliderPosition: 0,
      })
    }, duration)
  }

  convertChildToCbObj = (index) => {
    const { children } = this.getDerivedPropsFromBreakPoint()
    // support decimal itemsToShow
    const roundedIdx = Math.round(index)
    const child = Children.toArray(children)[roundedIdx]
    return { item: child.props, index: roundedIdx }
  }

  getNextItemIndex = (currentIndex, getPrev) => {
    const { children, itemsToShow, itemsToScroll } =
      this.getDerivedPropsFromBreakPoint()
    const childrenLength = Children.toArray(children).length || 1
    const notEnoughItemsToShow = itemsToShow > childrenLength
    let limit = getPrev ? 0 : childrenLength - itemsToShow

    if (notEnoughItemsToShow) {
      limit = 0 // basically don't move
    }
    const nextAction = getPrev
      ? prevItemAction(0, itemsToScroll)
      : nextItemAction(limit, itemsToScroll)
    const nextItem = activeIndexReducer(currentIndex, nextAction)
    return nextItem
  }

  getNextItemObj = (getPrev) => {
    const { children } = this.getDerivedPropsFromBreakPoint()
    const { activeIndex } = this.state
    const nextItemIndex = this.getNextItemIndex(activeIndex, getPrev)
    // support decimal itemsToShow
    const roundedIdx = Math.round(nextItemIndex)
    const asElement = Children.toArray(children)[roundedIdx]
    const asObj = { item: asElement.props, index: roundedIdx }
    return asObj
  }

  resetSwipe = () => {
    this.setState({
      swipedSliderPosition: 0,
      transitioning: false,
      isSwiping: false,
    })
  }

  onSwiping = (data) => {
    const { deltaX, absX, deltaY, absY, dir } = data

    this.setState((state) => {
      const { childHeight, activeIndex, sliderPosition } = state
      const { itemsToShow, verticalMode, children, isRTL } =
        this.getDerivedPropsFromBreakPoint()

      const childWidth = this.calculateChildWidth()

      // determine how far can user swipe
      const childrenLength = Children.toArray(children).length || 1
      const goingNext =
        (!verticalMode && dir === 'Left' && !isRTL) ||
        (!verticalMode && dir === 'Right' && isRTL) ||
        (verticalMode && dir === 'Up')
      const goingBack =
        (!verticalMode && dir === 'Right' && !isRTL) ||
        (!verticalMode && dir === 'Left' && isRTL) ||
        (verticalMode && dir === 'Down')

      const horizontalSwipe = dir === 'Left' || dir === 'Right'
      const verticalSwipe = dir === 'Up' || dir === 'Down'
      const horizontalMode = !verticalMode

      let distanceSwipe = 0
      const horizontalEdgeStoppage = childWidth / 2
      const verticalEdgeStoppage = childHeight / 2

      if (verticalMode) {
        if (verticalSwipe) {
          const trackSize = childrenLength * childHeight
          if (goingNext) {
            distanceSwipe =
              trackSize -
              childHeight * activeIndex -
              itemsToShow * childHeight +
              verticalEdgeStoppage
          } else if (goingBack) {
            distanceSwipe = childHeight * activeIndex + verticalEdgeStoppage
          }
        }
      } else {
        if (horizontalSwipe) {
          const trackSize = childrenLength * childWidth
          if (goingNext) {
            distanceSwipe =
              trackSize -
              childWidth * activeIndex -
              itemsToShow * childWidth +
              horizontalEdgeStoppage
          } else if (goingBack) {
            distanceSwipe = childWidth * activeIndex + horizontalEdgeStoppage
          }
        }
      }

      const shouldHorizontalSkipUpdate =
        (horizontalMode && verticalSwipe) ||
        (horizontalMode && horizontalSwipe && absX > distanceSwipe)

      const shouldVerticalSkipUpdate =
        (verticalMode && horizontalSwipe) ||
        (verticalMode && verticalSwipe && absY > distanceSwipe)

      if (shouldHorizontalSkipUpdate || shouldVerticalSkipUpdate) {
        // bail out of state update
        return
      }
      let swipedSliderPosition
      if (horizontalSwipe) {
        if (isRTL) {
          swipedSliderPosition = sliderPosition - deltaX
        } else {
          swipedSliderPosition = sliderPosition + deltaX
        }
      } else {
        swipedSliderPosition = sliderPosition + deltaY
      }
      return {
        swipedSliderPosition,
        isSwiping: true,
        transitioning: true,
      }
    })
  }

  onSwiped = (data) => {
    // we need to handle all scenarios:
    // 1. Horizontal mode - swipe left or right
    // 2. Horizontal mode with RTL - swipe left or right
    // 3. vertical mode - swipe up or down

    const { absX, absY, dir } = data
    const { childHeight, activeIndex } = this.state
    const { verticalMode, isRTL, itemsToScroll } =
      this.getDerivedPropsFromBreakPoint()
    const childWidth = this.calculateChildWidth()

    let func = this.resetSwipe
    const minSwipeDistanceHorizontal = childWidth / 5
    const minSwipeDistanceVertical = childHeight / 5
    const swipedLeft = dir === 'Left'
    const swipedRight = dir === 'Right'
    const swipedUp = dir === 'Up'
    const swipedDown = dir === 'Down'
    const verticalGoSwipe =
      verticalMode &&
      (swipedUp || swipedDown) &&
      absY > minSwipeDistanceVertical

    const horizontalGoSwipe =
      !verticalMode &&
      (swipedRight || swipedLeft) &&
      absX > minSwipeDistanceHorizontal

    let goodToGo = false
    if (verticalGoSwipe || horizontalGoSwipe) {
      goodToGo = true
    }

    if (goodToGo) {
      // we should go to a different item
      // determine what method we need to invoke

      if (verticalMode) {
        // get number of slides from user's swiping
        const numberOfSlidesViaSwipe = Math.ceil(
          (absY - minSwipeDistanceVertical) / childHeight
        )
        // if user swipes more than itemsToScroll then we want to bypass itemsToScroll for a smoother scroll
        const numberOfSlidesTogo = Math.max(
          itemsToScroll,
          numberOfSlidesViaSwipe
        )

        const backSlidesToGo = activeIndex - numberOfSlidesTogo
        const forwardSlideTtoGo = activeIndex + numberOfSlidesTogo

        // up or down
        if (swipedDown) {
          // func = this.onPrevStart;
          func = () => this.goTo(backSlidesToGo, 'swipedDown')
        }
        if (swipedUp) {
          // func = this.onNextStart;
          func = () => this.goTo(forwardSlideTtoGo, 'swipedUp')
        }
      } else {
        // get number of slides from user's swiping
        const numberOfSlidesViaSwipe = Math.ceil(
          (absX - minSwipeDistanceHorizontal) / childWidth
        )
        // if user swipes more than itemsToScroll then we want to bypass itemsToScroll for a smoother scroll
        const numberOfSlidesTogo = Math.max(
          itemsToScroll,
          numberOfSlidesViaSwipe
        )

        const backSlidesToGo = activeIndex - numberOfSlidesTogo
        const forwardSlideTtoGo = activeIndex + numberOfSlidesTogo

        // horizontal mode
        if (isRTL) {
          // flip sides
          if (swipedLeft) {
            // func = this.onPrevStart;
            func = () => this.goTo(backSlidesToGo, 'swipedLeft')
          }
          if (swipedRight) {
            // func = this.onNextStart;
            func = () => this.goTo(forwardSlideTtoGo, 'swipedRight')
          }
        } else {
          // normal behavior
          if (swipedLeft) {
            // func = this.onNextStart;
            func = () => this.goTo(forwardSlideTtoGo, 'swipedLeft')
          }
          if (swipedRight) {
            // func = this.onPrevStart;
            func = () => this.goTo(backSlidesToGo, 'swipedRight')
          }
        }
      }
    }
    // we are not "tilting" on edges, so we need to reset isSwiping and transitioning.
    // otherwise we wont slide back to edge
    this.setState({ isSwiping: false, transitioning: false })
    func({ skipTilt: true })
  }

  onNextStart = (options) => {
    //console.log('onNextStart', options)
    const { onNextStart } = this.getDerivedPropsFromBreakPoint()
    const { activeIndex } = this.state
    const nextItemObj = this.getNextItemObj()
    const prevItemObj = this.convertChildToCbObj(activeIndex)
    onNextStart(prevItemObj, nextItemObj)
    this.slideNext(options, 'onNextStart')
  }

  onPrevStart = (options) => {
    const { onPrevStart } = this.getDerivedPropsFromBreakPoint()
    const { activeIndex } = this.state
    const nextItemObj = this.getNextItemObj(true)
    const prevItemObj = this.convertChildToCbObj(activeIndex)
    onPrevStart(prevItemObj, nextItemObj)
    this.slidePrev(options, 'onPrevStart')
  }

  slideNext = (options = {}, deOnde) => {
    const { skipTilt } = options
    //console.log('slideNext', { skipTilt, name })
    const { enableTilt } = this.getDerivedPropsFromBreakPoint()
    const { activeIndex, sliderPosition } = this.state
    const nextItem = this.getNextItemIndex(activeIndex, false)
    if (activeIndex !== nextItem) {
      this.goTo(nextItem, deOnde ? deOnde : 'slideNext')
    } else if (enableTilt && !skipTilt) {
      this.tiltMovement(sliderPosition, 20, 150)
    }
  }

  slidePrev = (options = {}, deOnde) => {
    const { skipTilt } = options
    const { activeIndex } = this.state
    const { enableTilt } = this.getDerivedPropsFromBreakPoint()
    const prevItem = this.getNextItemIndex(activeIndex, true)
    if (activeIndex !== prevItem) {
      this.goTo(prevItem, deOnde ? deOnde : 'slidePrev')
    } else if (enableTilt && !skipTilt) {
      this.tiltMovement(0, -20, 150)
    }
  }

  onNextEnd = () => {
    const { onNextEnd, onChange } = this.getDerivedPropsFromBreakPoint()
    const { activeIndex, activePage } = this.state

    const nextItemObj = this.convertChildToCbObj(activeIndex)
    this.removeSliderTransitionHook(this.onNextEnd)
    this.setState({ transitioning: false })
    onChange && onChange(nextItemObj, activePage)

    if (onNextEnd === noop) {
      this.onNextEndBack(activePage)
      return
    }
    onNextEnd(nextItemObj, activePage)
  }

  onNextEndBack = (activePage) => {
    const { autoPlaySpeed, itemsToShow, enableNextEndBack, enableAutoPlay } =
      this.getDerivedPropsFromBreakPoint()
    const { pages } = this.state

    if (!enableNextEndBack) {
      return
    }

    //console.log('onNextEndBack', activePage, pages.length, this.timeOutId)

    this.clearTimeOutId()

    if (enableAutoPlay && itemsToShow > 1) {
      if (activePage === pages.length - 1) {
        this.timeOutId = setTimeout(() => {
          this.goTo(0, 'sys')
        }, autoPlaySpeed)
      }
      return
    }

    // Added enableAutoPlay to prevent the carousel from looping
    // on the last item when enableAutoPlay is disabled.
    if (enableAutoPlay && activePage + 1 === pages.length) {
      this.timeOutId = setTimeout(() => {
        this.goTo(0, 'sys')
      }, autoPlaySpeed) // same time
    }
  }

  clearTimeOutId = () => {
    if (this.timeOutId) {
      clearTimeout(this.timeOutId)
      this.timeOutId = null
    }
  }

  onPrevEnd = () => {
    // if (this.isHoverActive) {
    //   return
    // }

    // console.log('onPrevEnd')
    // return

    const { onPrevEnd, onChange } = this.getDerivedPropsFromBreakPoint()
    const { activeIndex, activePage } = this.state
    //console.log('onPrevEnd', this.isHoverActive, activePage)

    const nextItemObj = this.convertChildToCbObj(activeIndex)
    this.removeSliderTransitionHook(this.onPrevEnd)
    this.setState({ transitioning: false })
    onChange && onChange(nextItemObj, activePage)
    onPrevEnd(nextItemObj, activePage)
  }

  generatePositionUpdater =
    (direction, nextItemId, verticalMode, isActionBlock, rest) => (state) => {
      const { sliderPosition, childHeight, activeIndex } = state

      //console.log('SL-POSITION: generatePositionUpdater', {
      //   sliderPosition,
      //   childHeight,
      //   activeIndex,
      // })

      if (isActionBlock) {
        return
      }

      const childWidth = this.calculateChildWidth()
      let newSliderPosition = 0
      const childSize = verticalMode ? childHeight : childWidth
      if (direction === consts.NEXT) {
        newSliderPosition =
          sliderPosition - childSize * (nextItemId - activeIndex)
      } else {
        newSliderPosition =
          sliderPosition + childSize * (activeIndex - nextItemId)
      }

      return {
        sliderPosition: newSliderPosition,
        activeIndex: nextItemId,
        swipedSliderPosition: 0,
        isSwiping: false,
        ...rest,
      }
    }

  goTo = (nextItemId, deOnde) => {
    //console.log('GOTO....:', { nextItemId, deOnde })
    this.nextTempItemId = nextItemId

    const { children, verticalMode, itemsToShow } =
      this.getDerivedPropsFromBreakPoint()

    const { activeIndex } = this.state
    const childrenLength = Children.toArray(children).length
    let safeNextItemId = Math.max(0, nextItemId) // don't allow negative numbers
    const isPrev = activeIndex > safeNextItemId // if we are going back
    const nextAvailableItem = this.getNextItemIndex(activeIndex, isPrev)
    const outOfBoundary = safeNextItemId + itemsToShow >= childrenLength

    const noChange = nextAvailableItem === activeIndex
    if (noChange) {
      return
    }

    if (outOfBoundary) {
      // Either go to last index (respect itemsToShow) or 0 index if we can't fill the slider
      safeNextItemId = Math.max(0, childrenLength - itemsToShow)
    }

    let isActionBlock = false
    if (this.isHoverActive) {
      // if we are hovering over the carousel, we don't want to slide
      isActionBlock = true
      if (
        deOnde === 'onNextStart' ||
        deOnde === 'onPrevStart' ||
        deOnde === 'swipedRight' ||
        deOnde === 'swipedLeft' ||
        deOnde === 'onIndicatorClick'
      ) {
        isActionBlock = false
      }

      if (nextItemId === 0) {
        isActionBlock = true
        if (
          deOnde === 'onIndicatorClick' ||
          deOnde === 'onPrevStart' ||
          deOnde === 'swipedRight'
        ) {
          isActionBlock = false
        }
      }
    }

    // console.log('GOTO....:', {
    //   nextItemId,
    //   deOnde,
    //   isActionBlock,
    //   nextAvailableItem,
    //   safeNextItemId,
    //   noChange,
    //   activeIndex,
    //   childrenLength,
    // })

    let direction = consts.NEXT
    let positionEndCb = this.onNextEnd

    if (isPrev) {
      direction = consts.PREV
      positionEndCb = this.onPrevEnd
    }

    const stateUpdater = this.generatePositionUpdater(
      direction,
      safeNextItemId,
      verticalMode,
      isActionBlock,
      {
        transitioning: true,
      }
    )

    this.setState(stateUpdater, () => {
      // callback
      pipe(this.updateActivePage(), this.onSliderTransitionEnd(positionEndCb))
    })
  }

  getNumOfPages = () => {
    const { children, itemsToShow } = this.getDerivedPropsFromBreakPoint()
    const childrenLength = Children.toArray(children).length
    const safeItemsToShow = Math.max(itemsToShow, 1)
    const numOfPages = Math.ceil(childrenLength / safeItemsToShow)
    return numOfPages || 1
  }

  updateActivePage = () => {
    //console.log('UPDATE ACTIVE PAGE updateActivePage:')

    this.setState((state) => {
      const { itemsToShow, children } = this.getDerivedPropsFromBreakPoint()
      const { activeIndex, activePage } = state
      const numOfPages = this.getNumOfPages()
      const childrenLength = Children.toArray(children).length
      const inRangeItemsToShow = Math.min(childrenLength, itemsToShow)
      // watch out from 0 (so we wont divide by zero)
      const safeItemsToShow = Math.max(inRangeItemsToShow, 1)
      const newActivePage = Math.ceil(activeIndex / safeItemsToShow)
      const inRangeActivePageIndex = Math.min(numOfPages - 1, newActivePage)
      if (activePage !== inRangeActivePageIndex) {
        return { activePage: inRangeActivePageIndex }
      }
    })
  }

  onIndicatorClick = (indicatorId) => {
    const { itemsToShow } = this.getDerivedPropsFromBreakPoint()
    const gotoIndex = indicatorId * itemsToShow
    this.setState({ activePage: indicatorId })
    this.goTo(gotoIndex, 'onIndicatorClick')
  }

  onMouseEnter = () => {
    const { enableAutoPlay } = this.getDerivedPropsFromBreakPoint()
    if (!enableAutoPlay) {
      return
    }

    this.isHoverActive = true
  }

  onMouseLeave = () => {
    //TODO: Improve this code to resume from where it left off when using onSwiping
    const { itemsToShow, enableAutoPlay } = this.getDerivedPropsFromBreakPoint()

    if (!enableAutoPlay) {
      return
    }

    this.isHoverActive = false

    const { activeIndex } = this.state
    //console.log('onMouseLeave', this.state, this.nextTempItemId)

    //Fix for the carousel not sliding when the mouse leaves from the latest item
    if (this.nextTempItemId === 0) {
      this.removeAutoPlay()
      this.goTo(0, 'slideNext')
    }

    //Fix the first item not sliding
    if (activeIndex === 0 && itemsToShow === 1 && !this.nextTempItemId) {
      this.goTo(1, 'slideNext')
    }
  }

  render() {
    const {
      activePage,
      isSwiping,
      sliderPosition,
      swipedSliderPosition,
      rootHeight,
      pages,
      activeIndex,
      transitionMs,
    } = this.state
    const {
      className,
      style,
      itemsToShow,
      itemsToScroll,
      verticalMode,
      isRTL,
      easing,
      tiltEasing,
      children,
      focusOnSelect,
      autoTabIndexVisibleItems,
      itemPosition,
      //itemPadding,
      slideSpacing,
      outerSpacing,
      enableSwipe,
      enableMouseSwipe,
      pagination,
      showArrows,
      disableArrowsOnEnd,
      preventDefaultTouchmoveEvent,
      renderArrow,
      renderPagination,
      renderLoading,
      itemHeight,
      arrowsInside,
    } = this.getDerivedPropsFromBreakPoint()

    const childWidth = this.calculateChildWidth()

    const numOfPages = this.getNumOfPages()

    /** Determine if arrows should be disabled */
    const canSlidePrev =
      activeIndex !== this.getNextItemIndex(activeIndex, true)
    const canSlideNext =
      activeIndex !== this.getNextItemIndex(activeIndex, false)
    const disabledPrevArrow = !canSlidePrev && disableArrowsOnEnd
    const disabledNextArrow = !canSlideNext && disableArrowsOnEnd

    //console.log('rendering carousel', rootHeight, this.isComponentMounted)

    return (
      <>
        {!this.isComponentMounted && (
          <Loading
            size={{ height: itemHeight }}
            itemsToShow={itemsToShow}
            verticalMode={verticalMode}
          >
            {renderLoading ? renderLoading : 'Loading...'}
          </Loading>
        )}

        <CarouselWrapper
          isRTL={isRTL}
          className={`${cssPrefix('carousel-wrapper')} ${className}`}
          style={style}
          size={{ height: this.isComponentMounted ? '' : '0px' }}
          overflow={this.isComponentMounted ? 'visible' : 'hidden'}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          <StyledCarousel
            className={cssPrefix('carousel')}
            size={{
              height: this.isComponentMounted ? rootHeight : itemHeight,
              width: this.isComponentMounted ? '100%' : '100%',
            }}
            opacity={this.isComponentMounted ? 1 : 0}
            overflow={this.isComponentMounted ? 'visible' : 'hidden'}
          >
            <Only when={showArrows}>
              {renderArrow ? (
                renderArrow({
                  type: consts.PREV,
                  onClick: this.onPrevStart,
                  isEdge: !canSlidePrev,
                })
              ) : (
                <Arrow
                  onClick={this.onPrevStart}
                  direction={verticalMode ? Arrow.up : Arrow.left}
                  disabled={disabledPrevArrow}
                  name="btn-prev"
                  itemHeight={this.isComponentMounted ? rootHeight : itemHeight}
                  arrowsInside={arrowsInside}
                />
              )}
            </Only>
            <SliderContainer
              verticalMode={verticalMode}
              className={cssPrefix('slider-container')}
              ref={this.setRef('sliderContainer')}
              size={{ height: itemHeight }}
              arrowsInside={arrowsInside}
            >
              <Slider
                verticalMode={verticalMode}
                isRTL={isRTL}
                easing={easing}
                sliderPosition={sliderPosition}
                swipedSliderPosition={swipedSliderPosition}
                isSwiping={isSwiping}
                transitionMs={transitionMs}
                tiltEasing={tiltEasing}
                className={cssPrefix('slider')}
                ref={this.setRef('slider')}
                outerSpacing={outerSpacing}
                activePage={activePage}
                currentItem={activeIndex}
              >
                <Track
                  verticalMode={verticalMode}
                  childWidth={childWidth}
                  currentItem={activeIndex}
                  autoTabIndexVisibleItems={autoTabIndexVisibleItems}
                  itemsToShow={itemsToShow}
                  itemsToScroll={itemsToScroll}
                  itemPosition={itemPosition}
                  slideSpacing={slideSpacing}
                  enableSwipe={enableSwipe}
                  enableMouseSwipe={enableMouseSwipe}
                  preventDefaultTouchmoveEvent={preventDefaultTouchmoveEvent}
                  onSwiped={this.onSwiped}
                  onSwiping={this.onSwiping}
                  onItemClick={focusOnSelect ? this.goTo : undefined}
                >
                  {Children.toArray(children)}
                </Track>
              </Slider>
            </SliderContainer>
            <Only when={showArrows}>
              {renderArrow ? (
                renderArrow({
                  type: consts.NEXT,
                  onClick: this.onNextStart,
                  isEdge: !canSlideNext,
                })
              ) : (
                <Arrow
                  onClick={this.onNextStart}
                  direction={verticalMode ? Arrow.down : Arrow.right}
                  disabled={disabledNextArrow}
                  name="btn-next"
                  itemHeight={this.isComponentMounted ? rootHeight : itemHeight}
                  arrowsInside={arrowsInside}
                />
              )}
            </Only>
          </StyledCarousel>
          {rootHeight > 0 && (
            <Only when={pagination}>
              {renderPagination ? (
                renderPagination({
                  pages: pages,
                  activePage,
                  onClick: this.onIndicatorClick,
                })
              ) : (
                <Pagination
                  numOfPages={numOfPages}
                  activePage={activePage}
                  onClick={this.onIndicatorClick}
                />
              )}
            </Only>
          )}
        </CarouselWrapper>
      </>
    )
  }
}

Carousel.defaultProps = {
  className: '',
  style: {},
  verticalMode: false,
  isRTL: false,
  initialFirstItem: 0,
  initialActiveIndex: 0,
  showArrows: true,
  showEmptySlots: false,
  disableArrowsOnEnd: true,
  pagination: true,
  easing: 'ease',
  tiltEasing: 'ease',
  transitionMs: 400,
  enableTilt: true,
  enableSwipe: true,
  enableMouseSwipe: true,
  preventDefaultTouchmoveEvent: false,
  focusOnSelect: false,
  autoTabIndexVisibleItems: true,
  itemsToShow: 1,
  itemsToScroll: 1,
  itemPosition: consts.CENTER,
  //itemPadding: [0, 0, 0, 0],
  outerSpacing: 0,
  enableAutoPlay: false, //TODO: era true
  autoPlaySpeed: 3000,
  enableNextEndBack: true,
  //News
  arrowsInside: false,
  slideSpacing: 0,
  itemHeight: 0,

  // callbacks
  onChange: noop,
  onNextEnd: noop,
  onPrevEnd: noop,
  onNextStart: noop,
  onPrevStart: noop,
  onResize: noop,

  loadComponent: null,
}

Carousel.propTypes = {
  /** Items to render */
  children: PropTypes.node.isRequired,

  /** New: The height of the carousel */
  itemHeight: PropTypes.number.isRequired,

  /** New: Adds spacing between slides */
  slideSpacing: PropTypes.number,

  /** New: Renders the arrows inside or outside the carousel */
  arrowsInside: PropTypes.bool,

  /** The loading component to display when the carousel is not ready */
  renderLoading: PropTypes.node,

  /** The css class for the root element */
  className: PropTypes.string,

  /** Number of visible items  */
  itemsToShow: PropTypes.number,

  /** Display the Carousel in a vertical layout */
  verticalMode: PropTypes.bool,

  /** Flip right to left */
  isRTL: PropTypes.bool,

  /** Show dots for paging */
  pagination: PropTypes.bool,

  /** Animation speed */
  transitionMs: PropTypes.number,

  /** transition easing pattern */
  easing: PropTypes.string,

  /** transition easing pattern for the tilt */
  tiltEasing: PropTypes.string,

  /** The "bump" animation when reaching the last item */
  enableTilt: PropTypes.bool,

  /** Number of items to scroll */
  itemsToScroll: PropTypes.number,

  /** Collection of objects with a width, itemsToShow and itemsToScroll  */
  breakPoints: PropTypes.arrayOf(
    PropTypes.shape({
      width: PropTypes.number.isRequired,
      itemsToShow: PropTypes.number,
      itemsToScroll: PropTypes.number,
    })
  ),

  /** The initial active index when the component mounts */
  initialActiveIndex: PropTypes.number,

  /** **DEPRECATED - use initialActiveIndex instead** The first items when the component mounts */
  initialFirstItem: PropTypes.number,

  /** Show the arrow buttons */
  showArrows: PropTypes.bool,

  /** Show empty slots when children.length < itemsToShow (not compatible with verticalMode yet !) */
  showEmptySlots: PropTypes.bool,

  /** Disables the arrow button when there are no more items */
  disableArrowsOnEnd: PropTypes.bool,

  /** Go to item on click */
  focusOnSelect: PropTypes.bool,

  /** Position the element relative to it's wrapper (use the consts object) - consts.START | consts.CENTER | consts.END */
  itemPosition: PropTypes.oneOf([consts.START, consts.CENTER, consts.END]),

  /** A margin at the beginning and at the end of the carousel (not compatible with verticalMode yet !)
   * @deprecated Use `slideSpacing` instead.
   */
  outerSpacing: PropTypes.number,

  // swipe
  /** Enable or disable swipe */
  enableSwipe: PropTypes.bool,

  /** Enable or disable mouse swipe */
  enableMouseSwipe: PropTypes.bool,

  /** Prevent page scroll on touchmove.
   * Use this to stop the browser from scrolling while a user swipes.
   * More details: https://github.com/FormidableLabs/react-swipeable#preventdefaulttouchmoveevent-details
   */
  preventDefaultTouchmoveEvent: PropTypes.bool,

  // auto play
  /** Enable or disable auto play */
  enableAutoPlay: PropTypes.bool,

  /** Set auto play speed (ms) */
  autoPlaySpeed: PropTypes.number,

  /** Enable or disable the nextEndBack feature */
  enableNextEndBack: PropTypes.bool,

  /** Automatically inject `tabIndex:0` to visible items */
  autoTabIndexVisibleItems: PropTypes.bool,

  /** The style object for the root element */
  style: PropTypes.object,

  /** A render prop for the arrow component
   * - ({type, onClick}) => <div onClick={onClick}>{type === 'prev' ? '<-' : '->'}</div>
   */
  renderArrow: PropTypes.func,

  /** A render prop for the pagination component
   * - ({ pages, activePage, onClick }) =>  <YourComponent/>
   */
  renderPagination: PropTypes.func,

  // callbacks
  /** A callback for the change of an item
   * - onChange(currentItemObject, currentPageIndex) => {} */
  onChange: PropTypes.func,

  /** A callback for the beginning of the next transition
   * - onNextStart(prevItemObject, nextItemObject) => {} */
  onNextStart: PropTypes.func,

  /** A callback for the beginning of the prev transition
   * - onPrevStart(prevItemObject, nextItemObject) => {} */
  onPrevStart: PropTypes.func,

  /** A callback for the end of the next transition
   * - onNextEnd(nextItemObject, currentPageIndex) => {} */
  onNextEnd: PropTypes.func,

  /** A callback for the end of the prev transition
   * - onPrevEnd(nextItemObject, currentPageIndex) => {} */
  onPrevEnd: PropTypes.func,

  /** A callback for the "slider-container" resize
   * - onResize(currentBreakPoint) => {} */
  onResize: PropTypes.func,
}

export default Carousel
