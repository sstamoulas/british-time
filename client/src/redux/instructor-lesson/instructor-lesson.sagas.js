import { takeLatest, put, all, call } from 'redux-saga/effects';

import InstructorLessonActionTypes from './instructor-lesson.types';

import { actionStart, actionStop } from './../ui/ui.actions';
import { 
  fetchInstructorLessonsSuccess,
  fetchInstructorLessonsFailure,
  fetchInstructorLessonSuccess,
  fetchInstructorLessonFailure,
  createInstructorLessonSuccess, 
  createInstructorLessonFailure,
  updateInstructorLessonSuccess, 
  updateInstructorLessonFailure,
} from './instructor-lesson.actions';

import { 
  getLessonsByCourseId,
  getLessonByLessonId,
  createLessonDocument,
  updateLessonDocument,
} from '../../firebase/firebase.utils';

export function* fetchInstructorLessonsAsync({ type, payload: { instructorCourseId }}) {
  try {
    yield put(actionStart(type));
    const instructorLessonsRef = yield call(getLessonsByCourseId, instructorCourseId);

    yield put(fetchInstructorLessonsSuccess({ ...instructorLessonsRef }));
  } catch(error) {
    yield put(fetchInstructorLessonsFailure(error));
  } finally {
    yield put(actionStop(type));
  }
}

export function* fetchInstructorLessonAsync({ type, payload: { instructorCourseId, lessonId }}) {
  try {
    yield put(actionStart(type));
    const instructorLessonRef = yield call(getLessonByLessonId, instructorCourseId, lessonId);

    yield put(fetchInstructorLessonSuccess({ ...instructorLessonRef }));
  } catch(error) {
    yield put(fetchInstructorLessonFailure(error));
  } finally {
    yield put(actionStop(type));
  }
}

export function* createInstructorLessonAsync({type, payload: { lessonDetails }}) {
  try {
    yield put(actionStart(type));
    yield call(createLessonDocument, lessonDetails);
    const instructorLessonRef = yield call(getLessonsByCourseId, lessonDetails.courseId);

    yield put(createInstructorLessonSuccess({ ...instructorLessonRef }));
  } catch(error) {
    yield put(createInstructorLessonFailure(error));
  } finally {
    yield put(actionStop(type));
  }
}

export function* updateInstructorLessonAsync({type, payload: { lessonId, lessonDetails }}) {
  try {
    yield put(actionStart(type));
    yield call(updateLessonDocument, lessonId, lessonDetails);
    const instructorLessonRef = yield call(getLessonsByCourseId, lessonDetails.courseId);

    yield put(updateInstructorLessonSuccess({ ...instructorLessonRef }));
  } catch(error) {
    yield put(updateInstructorLessonFailure(error));
  } finally {
    yield put(actionStop(type));
  }
}

export function* onFetchInstructorLessonsStart() {
  yield takeLatest(
    InstructorLessonActionTypes.FETCH_INSTRUCTOR_LESSONS_START, 
    fetchInstructorLessonsAsync
  );
}

export function* onFetchInstructorLessonStart() {
  yield takeLatest(
    InstructorLessonActionTypes.FETCH_INSTRUCTOR_LESSON_START, 
    fetchInstructorLessonAsync
  );
}

export function* onCreateInstructorLessonStart() {
  yield takeLatest(
    InstructorLessonActionTypes.CREATE_INSTRUCTOR_LESSON_START, 
    createInstructorLessonAsync
  );
}

export function* onUpdateInstructorLessonStart() {
  yield takeLatest(
    InstructorLessonActionTypes.UPDATE_INSTRUCTOR_LESSON_START, 
    updateInstructorLessonAsync
  );
}

export function* instructorLessonSagas() {
  yield all([
    call(onFetchInstructorLessonsStart),
    call(onFetchInstructorLessonStart),
    call(onCreateInstructorLessonStart),
    call(onUpdateInstructorLessonStart),
  ]);
}
