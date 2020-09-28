import { all, call } from 'redux-saga/effects';

import { userSagas } from './user/user.sagas';
import { systemSagas } from './system/system.sagas';
import { courseSagas } from './course/course.sagas';
import { instructorSagas } from './instructor/instructor.sagas';

export default function* rootSaga() {
  yield all([
    call(userSagas),
    call(systemSagas),
    call(courseSagas),
    call(instructorSagas),
  ]);
}
