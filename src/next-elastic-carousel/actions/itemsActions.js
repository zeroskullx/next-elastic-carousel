import { NEXT_ITEM, PREV_ITEM } from "../constants";

export const nextItemAction = (limit, itemsToScroll) => ({
  type: NEXT_ITEM,
  limit,
  itemsToScroll
});

export const prevItemAction = (limit, itemsToScroll) => ({
  type: PREV_ITEM,
  limit,
  itemsToScroll
});
