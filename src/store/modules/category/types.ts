export interface categoryState {
  category: string;
}

export const SELECT_CATEGORY = '@category/SELECT_CATEGORY';

export interface setCategory {
  type: typeof SELECT_CATEGORY;
  payload: { category: string };
}

export type categoriesActionTypes =
  | setCategory;
