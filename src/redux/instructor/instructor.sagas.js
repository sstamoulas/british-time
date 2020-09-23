import { takeLatest, put, all, call, select } from 'redux-saga/effects';

import InstructorActionTypes from './instructor.types';

import { actionStart, actionStop } from './../ui/ui.actions';
import { 
  createCourseSuccess, 
  createCourseFailure,
} from './instructor.actions';

import { addCourse } from './instructor.utils';

import { createCourseDocument } from '../../firebase/firebase.utils';

export function* createCourseAsync({type, payload: { courseDetails }}) {
  const {user: { currentUser: { id, courses }}} = yield select();

  try {
    yield put(actionStart(type));
    yield call(createCourseDocument, id, addCourse(courses, courseDetails));
    yield put(createCourseSuccess());
  } catch(error) {
    yield put(createCourseFailure(error));
  } finally {
    yield put(actionStop(type));
  }
}

export function* onCreateCourseStart() {
  yield takeLatest(
    InstructorActionTypes.CREATE_COURSE_START, 
    createCourseAsync
  );
}

export function* instructorSagas() {
  yield all([
    call(onCreateCourseStart),
  ]);
}
