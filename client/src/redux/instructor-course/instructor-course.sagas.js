import { takeLatest, put, all, call, select } from 'redux-saga/effects';

import UserActionTypes from './../user/user.types';
import InstructorCourseActionTypes from './instructor-course.types';

import { actionStart, actionStop, subActionStart, subActionStop } from './../ui/ui.actions';
import { 
  fetchAllCoursesSuccess,
  fetchAllCoursesFailure,
  fetchInstructorsByCourseIdSuccess,
  fetchInstructorsByCourseIdFailure,
  fetchInstructorCourseDetailsSuccess,
  fetchInstructorCourseDetailsFailure,
  fetchInstructorCourseDetailsByCourseIdSuccess,
  fetchInstructorCourseDetailsByCourseIdFailure,
  createInstructorCourseDetailsSuccess, 
  createInstructorCourseDetailsFailure,
  updateInstructorCourseDetailsSuccess, 
  updateInstructorCourseDetailsFailure,
} from './instructor-course.actions';

import { 
  getAllInstructorCourses,
  getCoursesByInstructorId,
  getInstructorsByCourseId,
  getInstructorCourseByCourseId,
  createInstructorCourseDetailsDocument,
  updateInstructorCourseDetailsDocument,
} from '../../firebase/firebase.utils';

import * as ROLES from './../../constants/roles';

export function* fetchAllCoursesAsync({ type }) {
  try {
    yield put(subActionStart(type));
    const coursesRef = yield call(getAllInstructorCourses);

    yield put(fetchAllCoursesSuccess({ ...coursesRef }));
  } catch(error) {
    yield put(fetchAllCoursesFailure(error));
  } finally {
    yield put(subActionStop(type));
  }
}

export function* fetchInstructorsByCourseIdAsync({ type, payload: { courseId }}) {
  try {
    yield put(actionStart(type));
    const instructorsRef = yield call(getInstructorsByCourseId, courseId);

    yield put(fetchInstructorsByCourseIdSuccess({ ...instructorsRef }));
  } catch(error) {
    yield put(fetchInstructorsByCourseIdFailure(error));
  } finally {
    yield put(actionStop(type));
  }
}

export function* fetchInstructorCourseDetailsAsync({ type }) {
  const {user: { currentUser: { id }}} = yield select();

  try {
    yield put(actionStart(type));
    const instructorCoursesRef = yield call(getCoursesByInstructorId, id);

    yield put(fetchInstructorCourseDetailsSuccess({ ...instructorCoursesRef }));
  } catch(error) {
    yield put(fetchInstructorCourseDetailsFailure(error));
  } finally {
    yield put(actionStop(type));
  }
}

export function* fetchInstructorCourseDetailsByCourseIdAsync({ type, payload: { courseId }}) {
  try {
    yield put(actionStart(type));
    const instructorCourseRef = yield call(getInstructorCourseByCourseId, courseId);

    yield put(fetchInstructorCourseDetailsByCourseIdSuccess({ ...instructorCourseRef }));
  } catch(error) {
    yield put(fetchInstructorCourseDetailsByCourseIdFailure(error));
  } finally {
    yield put(actionStop(type));
  }
}

export function* createInstructorCourseDetailsAsync({type, payload: { courseDetails }}) {
  const {user: { currentUser }} = yield select();

  try {
    yield put(actionStart(type));
    yield call(createInstructorCourseDetailsDocument, currentUser, courseDetails);
    const instructorCourseRef = yield call(getCoursesByInstructorId, currentUser.id);

    yield put(createInstructorCourseDetailsSuccess({ ...instructorCourseRef }));
  } catch(error) {
    yield put(createInstructorCourseDetailsFailure(error));
  } finally {
    yield put(actionStop(type));
  }
}

export function* updateInstructorCourseDetailsAsync({type, payload: { courseId, courseDetails }}) {
  const {user: { currentUser: { id }}} = yield select();
  
  try {
    yield put(actionStart(type));
    yield call(updateInstructorCourseDetailsDocument, courseId, courseDetails);
    const instructorCourseRef = yield call(getCoursesByInstructorId, id);

    yield put(updateInstructorCourseDetailsSuccess({ ...instructorCourseRef }));
  } catch(error) {
    yield put(updateInstructorCourseDetailsFailure(error));
  } finally {
    yield put(actionStop(type));
  }
}

export function* isInstructor({ type }) {
  const {user: { currentUser: { role }}} = yield select();

  if(role === ROLES.INSTRUCTOR) {
    yield fetchInstructorCourseDetailsAsync({ type });
  }
}

export function* onSignInSuccess() {
  yield takeLatest(
    UserActionTypes.SIGN_IN_SUCCESS, 
    isInstructor
  );
}

export function* onFetchAllCoursesStart() {
  yield takeLatest(
    InstructorCourseActionTypes.FETCH_ALL_COURSES_START,
    fetchAllCoursesAsync
  );
}

export function* onFetchInstructorsByCourseIdStart() {
  yield takeLatest(
    InstructorCourseActionTypes.FETCH_INSTRUCTORS_BY_COURSE_ID_START,
    fetchInstructorsByCourseIdAsync
  );
}

export function* onFetchInstructorCourseDetailsStart() {
  yield takeLatest(
    InstructorCourseActionTypes.FETCH_INSTRUCTOR_COURSE_DETAILS_START, 
    fetchInstructorCourseDetailsAsync
  );
}

export function* onFetchInstructorCourseDetailsByCourseIdStart() {
  yield takeLatest(
    InstructorCourseActionTypes.FETCH_INSTRUCTOR_COURSE_DETAILS_BY_COURSE_ID_START, 
    fetchInstructorCourseDetailsByCourseIdAsync
  );
}

export function* onCreateInstructorCourseDetailsStart() {
  yield takeLatest(
    InstructorCourseActionTypes.CREATE_INSTRUCTOR_COURSE_DETAILS_START, 
    createInstructorCourseDetailsAsync
  );
}

export function* onUpdateInstructorCourseDetailsStart() {
  yield takeLatest(
    InstructorCourseActionTypes.UPDATE_INSTRUCTOR_COURSE_DETAILS_START, 
    updateInstructorCourseDetailsAsync
  );
}

export function* instructorCourseSagas() {
  yield all([
    call(onSignInSuccess),
    call(onFetchAllCoursesStart),
    call(onFetchInstructorsByCourseIdStart),
    call(onFetchInstructorCourseDetailsStart),
    call(onCreateInstructorCourseDetailsStart),
    call(onUpdateInstructorCourseDetailsStart),
    call(onFetchInstructorCourseDetailsByCourseIdStart),
  ]);
}
