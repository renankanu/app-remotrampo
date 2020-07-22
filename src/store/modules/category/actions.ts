import { categoriesActionTypes, SELECT_CATEGORY } from './types';

export const setCategory = (category: string): categoriesActionTypes => {
  return {
    type: SELECT_CATEGORY,
    payload: { category },
  };
};
