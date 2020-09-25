import { takeLatest, put, all, call, select } from 'redux-saga/effects';

import UserActionTypes from './../user/user.types';
import InstructorActionTypes from './instructor.types';

import { actionStart, actionStop } from './../ui/ui.actions';
import { 
  fetchInstructorDetailsSuccess, 
  fetchInstructorDetailsFailure,
  createInstructorDetailsSuccess, 
  createInstructorDetailsFailure,
  updateInstructorDetailsSuccess, 
  updateInstructorDetailsFailure,
} from './instructor.actions';

import { fetchCurrentInstructor, createInstructorDetailsDocument, updateInstructorDetailsDocument } from '../../firebase/firebase.utils';

import * as ROLES from './../../constants/roles';

export function* createInstructorDetailsAsync({type, payload: { instructorDetails }}) {
  const {user: { currentUser: { id, userName }}} = yield select();

  try {
    yield put(actionStart(type));
    const instructorRef = yield call(createInstructorDetailsDocument, id, userName, instructorDetails);
    const instructorSnapshot = yield instructorRef.get();

    console.log(...instructorSnapshot.data())

    yield put(createInstructorDetailsSuccess({ id: instructorSnapshot.id, ...instructorSnapshot.data() }));
  } catch(error) {
    yield put(createInstructorDetailsFailure(error));
  } finally {
    yield put(actionStop(type));
  }
}

export function* updateInstructorDetailsAsync({type, payload: { instructorDetails }}) {
  const {user: { currentUser: { id }}} = yield select();

  try {
    yield put(actionStart(type));
    const instructorRef = yield call(updateInstructorDetailsDocument, id, instructorDetails);
    const instructorSnapshot = yield instructorRef.get();

    yield put(updateInstructorDetailsSuccess({ ...instructorSnapshot.data() }));
  } catch(error) {
    yield put(updateInstructorDetailsFailure(error));
  } finally {
    yield put(actionStop(type));
  }
}

export function* isInstructor({ type }) {
  const {user: { currentUser: { id, role }}} = yield select();

  if(role === ROLES.INSTRUCTOR) {
    try {
      yield put(actionStart(type));
      const instructor = yield fetchCurrentInstructor(id);

      if (!instructor)
        return yield put(fetchInstructorDetailsSuccess(null));
      yield put(fetchInstructorDetailsSuccess(instructor));
    } catch(error) {
      yield put(fetchInstructorDetailsFailure(error));
    } finally {
      yield put(actionStop(type));
    }
  }
}

export function* onSignInSuccess() {
  yield takeLatest(
    UserActionTypes.SIGN_IN_SUCCESS, 
    isInstructor
  );
}

export function* onCreateInstructorDetailsStart() {
  yield takeLatest(
    InstructorActionTypes.CREATE_INSTRUCTOR_DETAILS_START, 
    createInstructorDetailsAsync
  );
}

export function* onUpdateInstructorDetailsStart() {
  yield takeLatest(
    InstructorActionTypes.UPDATE_INSTRUCTOR_DETAILS_START, 
    updateInstructorDetailsAsync
  );
}

export function* instructorSagas() {
  yield all([
    call(onSignInSuccess),
    call(onCreateInstructorDetailsStart),
    call(onUpdateInstructorDetailsStart),
  ]);
}
