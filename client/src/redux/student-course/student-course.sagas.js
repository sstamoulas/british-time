import { takeLatest, put, all, call, select } from 'redux-saga/effects';

import StudentCourseActionTypes from './student-course.types';

import { actionStart, actionStop, subActionStart, subActionStop } from './../ui/ui.actions';
import { 
  fetchStudentCoursesSuccess,
  fetchStudentCoursesFailure,
  fetchStudentCourseSuccess,
  fetchStudentCourseFailure,
  createStudentCourseSuccess, 
  createStudentCourseFailure,
  updateStudentCourseSuccess, 
  updateStudentCourseFailure,
} from './student-course.actions';

import { 
  getCoursesByStudentId,
  getStudentCourseByCourseId,
  createStudentCourseDetailsDocument,
  updateStudentCourseDetailsDocument,
} from '../../firebase/firebase.utils';

export function* fetchStudentCoursesAsync({ type }) {
  const {user: { currentUser: { id }}} = yield select();

  try {
    yield put(subActionStart(type));
    const studentCoursesRef = yield call(getCoursesByStudentId, id);

    console.log(studentCoursesRef)

    yield put(fetchStudentCoursesSuccess({ ...studentCoursesRef }));
  } catch(error) {
    yield put(fetchStudentCoursesFailure(error));
  } finally {
    yield put(subActionStop(type));
  }
}

export function* fetchStudentCourseAsync({ type, payload: { courseId }}) {
  try {
    yield put(subActionStart(type));
    const studentCourseRef = yield call(getStudentCourseByCourseId, courseId);

    yield put(fetchStudentCourseSuccess({ ...studentCourseRef }));
  } catch(error) {
    yield put(fetchStudentCourseFailure(error));
  } finally {
    yield put(subActionStop(type));
  }
}

export function* createStudentCourseAsync({type, payload: { courseDetails }}) {
  const {user: { currentUser: { id }}} = yield select();

  try {
    yield put(actionStart(type));
    yield call(createStudentCourseDetailsDocument, id, courseDetails);
    const studentCourseRef = yield call(getCoursesByStudentId, id);

    yield put(createStudentCourseSuccess({ ...studentCourseRef }));
  } catch(error) {
    yield put(createStudentCourseFailure(error));
  } finally {
    yield put(actionStop(type));
  }
}

export function* updateStudentCourseAsync({type, payload: { courseId, courseDetails }}) {
  const {user: { currentUser: { id }}} = yield select();

  try {
    yield put(actionStart(type));
    yield call(updateStudentCourseDetailsDocument, courseId, courseDetails);
    const studentCourseRef = yield call(getCoursesByStudentId, id);

    yield put(updateStudentCourseSuccess({ ...studentCourseRef }));
  } catch(error) {
    yield put(updateStudentCourseFailure(error));
  } finally {
    yield put(actionStop(type));
  }
}

export function* onFetchStudentCoursesStart() {
  yield takeLatest(
    StudentCourseActionTypes.FETCH_STUDENT_COURSES_START, 
    fetchStudentCoursesAsync
  );
}

export function* onFetchStudentCourseStart() {
  yield takeLatest(
    StudentCourseActionTypes.FETCH_STUDENT_COURSE_START, 
    fetchStudentCourseAsync
  );
}

export function* onCreateStudentCourseStart() {
  yield takeLatest(
    StudentCourseActionTypes.CREATE_STUDENT_COURSE_START, 
    createStudentCourseAsync
  );
}

export function* onUpdateStudentCourseStart() {
  yield takeLatest(
    StudentCourseActionTypes.UPDATE_STUDENT_COURSE_START, 
    updateStudentCourseAsync
  );
}

export function* studentCourseSagas() {
  yield all([
    call(onFetchStudentCoursesStart),
    call(onFetchStudentCourseStart),
    call(onCreateStudentCourseStart),
    call(onUpdateStudentCourseStart),
  ]);
}
