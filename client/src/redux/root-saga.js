import { all, call } from 'redux-saga/effects';

import { userSagas } from './user/user.sagas';
import { systemSagas } from './system/system.sagas';
import { courseSagas } from './course/course.sagas';
import { instructorSagas } from './instructor/instructor.sagas';
import { instructorCourseSagas } from './instructor-course/instructor-course.sagas';
import { instructorLessonSagas } from './instructor-lesson/instructor-lesson.sagas';
import { studentSagas } from './student/student.sagas';
import { studentCourseSagas } from './student-course/student-course.sagas';
import { paymentHistorySagas } from './payment-history/payment-history.sagas';

export default function* rootSaga() {
  yield all([
    call(userSagas),
    call(systemSagas),
    call(courseSagas),
    call(instructorSagas),
    call(instructorCourseSagas),
    call(instructorLessonSagas),
    call(studentSagas),
    call(studentCourseSagas),
    call(paymentHistorySagas),
  ]);
}
