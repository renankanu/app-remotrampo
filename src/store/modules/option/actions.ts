import { UpdateOption, SELECT_OPTION } from './types';

export const updateOption = (id: number): UpdateOption => {
  return {
    type: SELECT_OPTION,
    payload: { id },
  };
};
