import produce from 'immer';
import {
  optionsActionTypes,
  optionState,
  TypeSearch,
  SELECT_OPTION,
} from './types';

const INITIAL_STATE: optionState = {
  options: [
    {
      id: 5,
      name: TypeSearch.all,
      isSelected: true,
    },
    {
      id: 1,
      name: TypeSearch.category,
      isSelected: false,
    },
    {
      id: 2,
      name: TypeSearch.tags,
      isSelected: false,
    },
    {
      id: 3,
      name: TypeSearch.company_name,
      isSelected: false,
    },
    {
      id: 4,
      name: TypeSearch.search,
      isSelected: false,
    },
  ],
};

export default function  optionReducer (
  state = INITIAL_STATE,
  action: optionsActionTypes,
): optionState {
  return produce(state, draft => {
    switch (action.type) {
      case SELECT_OPTION: {
        draft.options = draft.options.map(option => {
          return option.id === action.payload.id
            ? { ...option, isSelected: true }
            : { ...option, isSelected: false };
        });
        break;
      }
      default:
    }
  });
};
