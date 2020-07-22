import produce from 'immer';
import {
  categoriesActionTypes,
  categoryState,
  SELECT_CATEGORY,
} from './types';

const INITIAL_STATE: categoryState = {
  category: '',
};

export default function  optionReducer (
  state = INITIAL_STATE,
  action: categoriesActionTypes,
): categoryState {
  return produce(state, draft => {
    switch (action.type) {
      case SELECT_CATEGORY: {
        draft.category = action.payload.category
        break;
      }
      default:
    }
  });
};
