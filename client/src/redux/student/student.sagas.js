import { takeLatest, put, all, call, select } from 'redux-saga/effects';

import UserActionTypes from './../user/user.types';
import StudentActionTypes from './student.types';

import { actionStart, actionStop } from './../ui/ui.actions';
import { 
  fetchStudentDetailsSuccess, 
  fetchStudentDetailsFailure,
  createStudentDetailsSuccess, 
  createStudentDetailsFailure,
  updateStudentDetailsSuccess, 
  updateStudentDetailsFailure,
} from './student.actions';

import { 
  fetchCurrentStudent, 
  createStudentDetailsDocument, 
  updateStudentDetailsDocument,
} from '../../firebase/firebase.utils';

import * as ROLES from './../../constants/roles';

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

export function* isStudent({ type }) {
  const {user: { currentUser: { id, role }}} = yield select();

  if(role === ROLES.STUDENT) {
    try {
      yield put(actionStart(type));
      const studentDetails = yield fetchCurrentStudent(id);

      if (!studentDetails)
        return yield put(fetchStudentDetailsSuccess(null));

      yield put(fetchStudentDetailsSuccess(studentDetails));
    } catch(error) {
      yield put(fetchStudentDetailsFailure(error));
    } finally {
      yield put(actionStop(type));
    }
  }
}

export function* onSignInSuccess() {
  yield takeLatest(
    UserActionTypes.SIGN_IN_SUCCESS, 
    isStudent
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

export function* studentSagas() {
  yield all([
    call(onSignInSuccess),
    call(onCreateStudentDetailsStart),
    call(onUpdateStudentDetailsStart),
  ]);
}
