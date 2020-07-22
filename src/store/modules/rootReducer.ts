import { combineReducers } from 'redux';

import options from './option/reducer';
import category from './category/reducer';

export default combineReducers({
  options,
  category
});
