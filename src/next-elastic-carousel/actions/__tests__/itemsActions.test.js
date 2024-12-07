import { prevItemAction, nextItemAction } from '../itemsActions'
import { PREV_ITEM, NEXT_ITEM } from '../../constants'

describe('prevItemAction', () => {
  it('should create an action to go to the next item', () => {
    const limit = 5
    const itemsToScroll = 2
    const expectedAction = {
      type: NEXT_ITEM,
      limit,
      itemsToScroll,
    }
    expect(nextItemAction(limit, itemsToScroll)).toEqual(expectedAction)
  })

  it('should create an action to go to the previous item', () => {
    const limit = 5
    const itemsToScroll = 2
    const expectedAction = {
      type: PREV_ITEM,
      limit,
      itemsToScroll,
    }
    expect(prevItemAction(limit, itemsToScroll)).toEqual(expectedAction)
  })
})
