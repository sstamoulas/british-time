import { takeLatest, put, all, call, select } from 'redux-saga/effects';

import InstructorActionTypes from './instructor.types';

import { actionStart, actionStop, subActionStart, subActionStop } from './../ui/ui.actions';
import { 
  fetchInstructorDetailsSuccess, 
  fetchInstructorDetailsFailure,
  updateInstructorDetailsSuccess, 
  updateInstructorDetailsFailure,
  updateInstructorRatingSuccess,
  updateInstructorRatingFailure,
} from './instructor.actions';

import { 
  fetchCurrentInstructor, 
  updateInstructorDetailsDocument,
  updateInstructorRatingDocument,
} from '../../firebase/firebase.utils';

export function* fetchInstructorDetailsAsync({ type }) {
  const {user: { currentUser: { id }}} = yield select();
  try {
    yield put(subActionStart(type));
    const instructorDetails = yield fetchCurrentInstructor(id);

    if (!instructorDetails)
      return yield put(fetchInstructorDetailsSuccess(null));
    yield put(fetchInstructorDetailsSuccess({...instructorDetails, instructorId: id}));
  } catch(error) {
    yield put(fetchInstructorDetailsFailure(error));
  } finally {
    yield put(subActionStop(type));
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
    const instructorRef = yield call(updateInstructorRatingDocument, instructorId, oldRating, rating);

    yield put(updateInstructorRatingSuccess({ ...instructorRef }));
  } catch(error) {
    yield put(updateInstructorRatingFailure(error));
  } finally {
    yield put(actionStop(type));
  }
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
    call(onFetchInstructorDetailsStart),
    call(onUpdateInstructorDetailsStart),
    call(onUpdateInstructorRatingStart),
  ]);
}
