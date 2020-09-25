import { takeLatest, put, all, call, select } from 'redux-saga/effects';

import CourseActionTypes from './course.types';

import { actionStart, actionStop } from './../ui/ui.actions';
import { 
  createCourseSuccess, 
  createCourseFailure,
  updateCourseSuccess, 
  updateCourseFailure,
} from './instructor.actions';

import { addCourse } from './instructor.utils';

import { createCourseDocument, updateCourseDocument } from '../../firebase/firebase.utils';

export function* createCourseAsync({type, payload: { courseDetails }}) {
  const {user: { currentUser: { id, courses }}} = yield select();

  try {
    yield put(actionStart(type));
    const courses = yield call(createCourseDocument, id, addCourse(courses, courseDetails));
    yield put(createCourseSuccess({ courses }));
  } catch(error) {
    yield put(createCourseFailure(error));
  } finally {
    yield put(actionStop(type));
  }
}

export function* updateCourseAsync({type, payload: { courseDetails }}) {
  const {user: { currentUser: { id, courses }}} = yield select();

  try {
    yield put(actionStart(type));
    const courses = yield call(updateCourseDocument, id, addCourse(courses, courseDetails));
    yield put(updateCourseSuccess({ courses }));
  } catch(error) {
    yield put(updateCourseFailure(error));
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

export function* onUpdateCourseStart() {
  yield takeLatest(
    InstructorActionTypes.UPDATE_COURSE_START, 
    updateCourseAsync
  );
}

export function* courseSagas() {
  yield all([
    call(onCreateCourseStart),
    call(onUpdateCourseStart),
  ]);
}
