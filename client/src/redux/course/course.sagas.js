import { takeLatest, put, all, call } from 'redux-saga/effects';

import CourseActionTypes from './course.types';

import { 
  actionStart, 
  actionStop, 
  subActionStart, 
  subActionStop 
} from './../ui/ui.actions';
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

export function* createCourseAsync({type, payload: { courseDetails }}) {
  try {
    yield put(actionStart(type));
    yield call(createCourseDocument, courseDetails);

    yield put(createCourseSuccess());
  } catch(error) {
    yield put(createCourseFailure(error));
  } finally {
    yield put(actionStop(type));
  }
}

export function* updateCourseAsync({type, payload: { courseId, courseDetails }}) {
  try {
    yield put(actionStart(type));
    yield call(updateCourseDocument, courseId, courseDetails);

    yield put(updateCourseSuccess());
  } catch(error) {
    yield put(updateCourseFailure(error));
  } finally {
    yield put(actionStop(type));
  }
}

export function* fetchCoursesAsync({ type }) {
  try {
    yield put(subActionStart(type));
    const courses = yield call(getAllCourses);

    yield put(fetchCoursesSuccess(courses));
  } catch(error) {
    yield put(fetchCoursesFailure(error));
  } finally {
    yield put(subActionStop(type));
  }
}

export function* fetchCourseByIdAsync({ type, payload: { courseId }}) {
  try {
    yield put(subActionStart(type));
    const currentCourse = yield call(getCourseById, courseId);

    yield put(fetchCourseByIdSuccess({ ...currentCourse, courseId }));
  } catch(error) {
    yield put(fetchCourseByIdFailure(error));
  } finally {
    yield put(subActionStop(type));
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

export function* courseSagas() {
  yield all([
    call(onCreateCourseStart),
    call(onUpdateCourseStart),
    call(onFetchCoursesStart),
    call(onFetchCourseByIdStart),
  ]);
}
