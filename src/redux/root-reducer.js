import { combineReducers } from 'redux';

import uiReducer from './ui/ui.reducer';
import userReducer from './user/user.reducer';
import systemReducer from './system/system.reducer';
import courseReducer from './course/course.reducer';
import instructorReducer from './instructor/instructor.reducer';

const rootReducer = combineReducers({
  ui: uiReducer,
  user: userReducer,
  system: systemReducer,
  course: courseReducer,
  instructor: instructorReducer,
});

export default rootReducer;
