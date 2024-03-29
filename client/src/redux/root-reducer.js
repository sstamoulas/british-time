import { combineReducers } from 'redux';

import uiReducer from './ui/ui.reducer';
import userReducer from './user/user.reducer';
import systemReducer from './system/system.reducer';
import courseReducer from './course/course.reducer';
import instructorReducer from './instructor/instructor.reducer';
import instructorCourseReducer from './instructor-course/instructor-course.reducer';
import instructorLessonReducer from './instructor-lesson/instructor-lesson.reducer';
import studentReducer from './student/student.reducer';
import studentCourseReducer from './student-course/student-course.reducer';
import paymentHistoryReducer from './payment-history/payment-history.reducer';

const rootReducer = combineReducers({
  ui: uiReducer,
  user: userReducer,
  system: systemReducer,
  course: courseReducer,
  instructor: instructorReducer,
  instructorCourses: instructorCourseReducer,
  instructorLessons: instructorLessonReducer,
  student: studentReducer,
  studentCourses: studentCourseReducer,
  paymentHistory: paymentHistoryReducer,
});

export default rootReducer;
