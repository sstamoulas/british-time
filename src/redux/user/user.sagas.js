import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';
import SystemActionTypes from '../system/system.types';
import InstructorActionTypes from '../instructor/instructor.types';

import { actionStart, actionStop } from './../ui/ui.actions';
import { 
  signUpSuccess, 
  signUpFailure,
  signInSuccess, 
  signInFailure, 
  signOutSuccess, 
  signOutFailure,
  passwordResetSuccess,
  passwordResetFailure,
} from './user.actions';

import { 
  auth, 
  createUserProfileDocument,
  getCurrentUser
} from '../../firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch(error) {
    yield put(signInFailure(error));
  }
}

export function* signUp({ type, payload: { userName, email, password, role }}) {
  try {
    yield put(actionStart(type));
    const { user } = yield auth.createUserWithEmailAndPassword(email, password)
    yield put(signUpSuccess({ user, additionalData: { userName, role }}));
  } catch(error) {
    yield put(signUpFailure(error));
  } finally {
    yield put(actionStop(type));
  }
}

export function* signInAfterSignUp({ type, payload: { user, additionalData }}) {
  yield put(actionStart(type));
  yield getSnapshotFromUserAuth(user, additionalData);
  yield put(actionStop(type));
}

export function* signInWithEmail({ type, payload: { email, password }}) {
  try {
    yield put(actionStart(type));
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch(error) {
    yield put(signInFailure(error));
  } finally {
    yield put(actionStop(type));
  }
}

export function* isUserAuthenticated({ type }) {
  try {
    yield put(actionStart(type));
    const userAuth = yield getCurrentUser();
    if (!userAuth)
      return yield put(signInSuccess(null));
    yield getSnapshotFromUserAuth(userAuth);
  } catch(error) {
    yield put(signInFailure(error));
  } finally {
    yield put(actionStop(type));
  }
}

export function* passwordReset({ type, payload: { email }}) {
  try {
    yield put(actionStart(type));
    yield auth.sendPasswordResetEmail(email);
    yield put(passwordResetSuccess());
  } catch(error) {
    yield put(passwordResetFailure(error));
  } finally {
    yield put(actionStop(type));
  }
}

export function* signOut({ type }) {
  try {
    yield put(actionStart(type));
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch(error) {
    yield put(signOutFailure(error));
  } finally {
    yield put(actionStop(type));
  }
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignInStart() {
  yield takeLatest(UserActionTypes.SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSessionStart() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION_START, isUserAuthenticated);
}

export function* onPasswordResetStart() {
  yield takeLatest(UserActionTypes.PASSWORD_RESET_START, passwordReset)
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onUpdateUserRoleSuccess() {
  yield takeLatest(SystemActionTypes.UPDATE_USER_ROLE_SUCCESS, isUserAuthenticated);
}

export function* onCreateCourseSuccess() {
  yield takeLatest(InstructorActionTypes.CREATE_COURSE_SUCCESS, isUserAuthenticated);
}

export function* userSagas() {
  yield all([
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignInStart), 
    call(onPasswordResetStart),
    call(onSignOutStart),
    call(onCheckUserSessionStart),
    call(onUpdateUserRoleSuccess),
    call(onCreateCourseSuccess),
  ]);
}
