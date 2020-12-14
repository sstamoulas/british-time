import { takeLatest, put, all, call, select } from 'redux-saga/effects';

import UserActionTypes from './../user/user.types';
import CourseActionTypes from './course.types';

import { actionStart, actionStop } from './../ui/ui.actions';
import { 
  createCourseSuccess, 
  createCourseFailure,
  updateCourseSuccess, 
  updateCourseFailure,
  fetchCoursesSuccess, 
  fetchCoursesFailure,
  fetchCourseByIdSuccess,
  fetchCourseByIdFailure,
} from './course.actions';

import { 
  createCourseDocument, 
  updateCourseDocument, 
  getAllCourses, 
  getCourseById 
} from '../../firebase/firebase.utils';

import * as ROLES from './../../constants/roles';

export function* createCourseAsync({type, payload: { courseDetails }}) {
  try {
    yield put(actionStart(type));
    const courses = yield call(createCourseDocument, courseDetails);
    yield put(createCourseSuccess({ courses }));
  } catch(error) {
    yield put(createCourseFailure(error));
  } finally {
    yield put(actionStop(type));
  }
}

export function* updateCourseAsync({type, payload: { courseDetails }}) {
  try {
    yield put(actionStart(type));
    const courses = yield call(updateCourseDocument, courseDetails);
    yield put(updateCourseSuccess({ courses }));
  } catch(error) {
    yield put(updateCourseFailure(error));
  } finally {
    yield put(actionStop(type));
  }
}

export function* fetchCoursesAsync({ type }) {
  try {
    yield put(actionStart(type));
    const courses = yield call(getAllCourses);
    yield put(fetchCoursesSuccess(courses));
  } catch(error) {
    yield put(fetchCoursesFailure(error));
  } finally {
    yield put(actionStop(type));
  }
}

export function* fetchCourseByIdAsync({ type, payload: { courseId } }) {
  try {
    yield put(actionStart(type));
    const currentCourse = yield call(getCourseById, courseId);
    yield put(fetchCourseByIdSuccess(currentCourse));
  } catch(error) {
    yield put(fetchCourseByIdFailure(error));
  } finally {
    yield put(actionStop(type));
  }
}

export function* isAdmin({ type }) {
  const {user: { currentUser: { role }}} = yield select();

  if(role === ROLES.ADMIN) {
    yield fetchCoursesAsync({type});
  }
}

export function* onCreateCourseStart() {
  yield takeLatest(
    CourseActionTypes.CREATE_COURSE_START, 
    createCourseAsync
  );
}

export function* onUpdateCourseStart() {
  yield takeLatest(
    CourseActionTypes.UPDATE_COURSE_START, 
    updateCourseAsync
  );
}

export function* onFetchCoursesStart() {
  yield takeLatest(
    CourseActionTypes.FETCH_COURSES_START, 
    fetchCoursesAsync
  );
}

export function* onFetchCourseByIdStart() {
  yield takeLatest(
    CourseActionTypes.FETCH_COURSE_BY_ID_START, 
    fetchCourseByIdAsync
  );
}

export function* onSignInSuccess() {
  yield takeLatest(
    UserActionTypes.SIGN_IN_SUCCESS, 
    isAdmin
  );
}

export function* courseSagas() {
  yield all([
    call(onCreateCourseStart),
    call(onUpdateCourseStart),
    call(onFetchCoursesStart),
    call(onFetchCourseByIdStart),
    call(onSignInSuccess),
  ]);
}
