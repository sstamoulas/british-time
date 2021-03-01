import { takeLatest, put, all, call, select } from 'redux-saga/effects';

import UserActionTypes from './../user/user.types';
import InstructorActionTypes from './instructor.types';

import { actionStart, actionStop, subActionStart, subActionStop } from './../ui/ui.actions';
import { 
  fetchInstructorDetailsSuccess, 
  fetchInstructorDetailsFailure,
  createInstructorDetailsSuccess, 
  createInstructorDetailsFailure,
  updateInstructorDetailsSuccess, 
  updateInstructorDetailsFailure,
  updateInstructorRatingSuccess,
  updateInstructorRatingFailure,
} from './instructor.actions';

import { fetchCoursesAsync } from './../course/course.sagas';

import { 
  fetchCurrentInstructor, 
  createInstructorDetailsDocument, 
  updateInstructorDetailsDocument,
  updateInstructorRatingDocument,
} from '../../firebase/firebase.utils';

import * as ROLES from './../../constants/roles';

export function* fetchInstructorDetailsAsync({type, payload: { instructorId }}) {
  try {
    yield put(subActionStart(type));
    const instructorDetails = yield fetchCurrentInstructor(instructorId);

    if (!instructorDetails)
      return yield put(fetchInstructorDetailsSuccess(null));
    yield put(fetchInstructorDetailsSuccess(instructorDetails));
  } catch(error) {
    yield put(fetchInstructorDetailsFailure(error));
  } finally {
    yield put(subActionStop(type));
  }
}

export function* createInstructorDetailsAsync({type, payload: { instructorDetails }}) {
  const {user: { currentUser: { id, userName }}} = yield select();

  try {
    yield put(actionStart(type));
    const instructorRef = yield call(createInstructorDetailsDocument, id, userName, instructorDetails);
    const instructorSnapshot = yield instructorRef.get();

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

export function* updateInstructorRatingAsync({type, payload: { instructorId, oldRating, rating }}) {
  try {
    yield put(actionStart(type));
    console.log(instructorId, oldRating, rating)
    const instructorRef = yield call(updateInstructorRatingDocument, instructorId, oldRating, rating);

    yield put(updateInstructorRatingSuccess({ ...instructorRef }));
  } catch(error) {
    yield put(updateInstructorRatingFailure(error));
  } finally {
    yield put(actionStop(type));
  }
}

export function* isInstructor({ type }) {
  const {user: { currentUser: { id, role }}} = yield select();

  if(role === ROLES.INSTRUCTOR) {
    try {
      yield put(actionStart(type));
      const instructorDetails = yield fetchCurrentInstructor(id);
      yield fetchCoursesAsync({ type });

      if (!instructorDetails)
        return yield put(fetchInstructorDetailsSuccess(null));
      yield put(fetchInstructorDetailsSuccess(instructorDetails));
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

export function* onFetchInstructorDetailsStart() {
  yield takeLatest(
    InstructorActionTypes.FETCH_INSTRUCTOR_DETAILS_START, 
    fetchInstructorDetailsAsync
  );
}

export function* onUpdateInstructorDetailsStart() {
  yield takeLatest(
    InstructorActionTypes.UPDATE_INSTRUCTOR_DETAILS_START, 
    updateInstructorDetailsAsync
  );
}

export function* onUpdateInstructorRatingStart() {
  yield takeLatest(
    InstructorActionTypes.UPDATE_INSTRUCTOR_RATING_START, 
    updateInstructorRatingAsync
  );
}

export function* instructorSagas() {
  yield all([
    call(onSignInSuccess),
    call(onFetchInstructorDetailsStart),
    call(onCreateInstructorDetailsStart),
    call(onUpdateInstructorDetailsStart),
    call(onUpdateInstructorRatingStart),
  ]);
}
