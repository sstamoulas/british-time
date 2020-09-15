import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

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

export function* signUp({ payload: { userName, email, password, roles }}) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password)
    yield put(signUpSuccess({ user, additionalData: { userName, roles }}));
  } catch(error) {
    yield put(signUpFailure(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalData }}) {
  yield getSnapshotFromUserAuth(user, additionalData);
}

export function* signInWithEmail({ payload: { email, password }}) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch(error) {
    yield put(signInFailure(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth)
      return yield put(signInSuccess(null));
    yield getSnapshotFromUserAuth(userAuth);
  } catch(error) {
    yield put(signInFailure(error));
  }
}

export function* passwordReset({ payload: { email }}) {
  try {
    yield auth.sendPasswordResetEmail(email);
    yield put(passwordResetSuccess());
  } catch(error) {
    yield put(passwordResetFailure(error));
  }
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch(error) {
    yield put(signOutFailure(error));
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

export function* userSagas() {
  yield all([
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignInStart), 
    call(onPasswordResetStart),
    call(onSignOutStart),
    call(onCheckUserSessionStart),
  ]);
}
