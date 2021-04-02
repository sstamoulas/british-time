import { takeLatest, put, all, call, select } from 'redux-saga/effects';

import StudentActionTypes from './student.types';

import { subActionStart, subActionStop, actionStart, actionStop } from './../ui/ui.actions';
import { 
  fetchStudentDetailsSuccess, 
  fetchStudentDetailsFailure,
  createStudentDetailsSuccess, 
  createStudentDetailsFailure,
  updateStudentDetailsSuccess, 
  updateStudentDetailsFailure,
  updateStudentFundsSuccess,
  updateStudentFundsFailure,
} from './student.actions';

import { 
  fetchCurrentStudent, 
  createStudentDetailsDocument, 
  updateStudentDetailsDocument,
} from '../../firebase/firebase.utils';

export function* fetchStudentDetailsAsync({ type }) {
  const {user: { currentUser: { id }}} = yield select();
  try {
    yield put(subActionStart(type));
    const studentDetails = yield fetchCurrentStudent(id);

    if (!studentDetails)
      return yield put(fetchStudentDetailsSuccess(null));
    yield put(fetchStudentDetailsSuccess({...studentDetails, studentId: id}));
  } catch(error) {
    yield put(fetchStudentDetailsFailure(error));
  } finally {
    yield put(subActionStop(type));
  }
}

export function* createStudentDetailsAsync({type, payload: { studentDetails }}) {
  const {user: { currentUser: { id, userName }}} = yield select();

  try {
    yield put(actionStart(type));
    const studentRef = yield call(createStudentDetailsDocument, id, userName, studentDetails);
    const studentSnapshot = yield studentRef.get();

    yield put(createStudentDetailsSuccess({ id: studentSnapshot.id, ...studentSnapshot.data() }));
  } catch(error) {
    yield put(createStudentDetailsFailure(error));
  } finally {
    yield put(actionStop(type));
  }
}

export function* updateStudentDetailsAsync({type, payload: { studentDetails }}) {
  const {user: { currentUser: { id }}} = yield select();

  try {
    yield put(actionStart(type));
    const studentRef = yield call(updateStudentDetailsDocument, id, studentDetails);
    const studentSnapshot = yield studentRef.get();

    yield put(updateStudentDetailsSuccess({ ...studentSnapshot.data() }));
  } catch(error) {
    yield put(updateStudentDetailsFailure(error));
  } finally {
    yield put(actionStop(type));
  }
}

export function* updateStudentFundsAsync({type, payload: { userId, funds }}) {
  try {
    yield put(actionStart(type));
    const studentRef = yield call(updateStudentDetailsDocument, userId, { funds });
    const studentSnapshot = yield studentRef.get();

    yield put(updateStudentFundsSuccess({ ...studentSnapshot.data() }));
  } catch(error) {
    yield put(updateStudentFundsFailure(error));
  } finally {
    yield put(actionStop(type));
  }
}

export function* onFetchStudentDetailsStart() {
  yield takeLatest(
    StudentActionTypes.FETCH_STUDENT_DETAILS_START, 
    fetchStudentDetailsAsync
  );
}

export function* onCreateStudentDetailsStart() {
  yield takeLatest(
    StudentActionTypes.CREATE_STUDENT_DETAILS_START, 
    createStudentDetailsAsync
  );
}

export function* onUpdateStudentDetailsStart() {
  yield takeLatest(
    StudentActionTypes.UPDATE_STUDENT_DETAILS_START, 
    updateStudentDetailsAsync
  );
}

export function* onUpdateStudentFundsStart() {
  yield takeLatest(
    StudentActionTypes.UPDATE_STUDENT_FUNDS_START,
    updateStudentFundsAsync
  );
}

export function* studentSagas() {
  yield all([
    call(onFetchStudentDetailsStart),
    call(onCreateStudentDetailsStart),
    call(onUpdateStudentDetailsStart),
    call(onUpdateStudentFundsStart),
  ]);
}
