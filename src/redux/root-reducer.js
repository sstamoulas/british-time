import { combineReducers } from 'redux';

import uiReducer from './ui/ui.reducer';
import userReducer from './user/user.reducer';
import systemReducer from './system/system.reducer';

const rootReducer = combineReducers({
  ui: uiReducer,
  user: userReducer,
  system: systemReducer,
});

export default rootReducer;
