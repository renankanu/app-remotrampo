import produce from 'immer';
import {
  UpdateOption,
  OptionState,
  TypeSearch,
  SELECT_OPTION,
} from './types';

const initialState: OptionState = {
  data: [
    {
      id: 5,
      name: TypeSearch.all,
      isSelected: false,
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

export const optionReducer = (
  state = initialState,
  action: UpdateOption,
): OptionState => {
  return produce(state, draft => {
    switch (action.type) {
      case SELECT_OPTION: {
        draft.data = draft.data.map(option => {
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
