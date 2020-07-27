export interface Option {
  id: number;
  name: TypeSearch;
  isSelected: boolean;
}

export interface optionState {
  options: Option[];
}

export enum TypeSearch {
  all = 'All',
  category = 'Category',
  company_name = 'Company name',
}

export const SELECT_OPTION = '@option/SELECT_OPTION';

export interface updateOption {
  type: typeof SELECT_OPTION;
  payload: { id: number };
}

export type optionsActionTypes =
  | updateOption;
