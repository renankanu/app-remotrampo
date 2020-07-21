import { optionsActionTypes, SELECT_OPTION } from './types';

export const updateOption = (id: number): optionsActionTypes => {
  return {
    type: SELECT_OPTION,
    payload: { id },
  };
};
