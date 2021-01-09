import { takeLatest, put, all, call, select } from 'redux-saga/effects';

import UserActionTypes from './../user/user.types';
import SystemActionTypes from './system.types';

import { 
  actionStart, 
  actionStop, 
  subActionStart, 
  subActionStop 
} from './../ui/ui.actions';
import { 
  fetchUsersSuccess, 
  fetchUsersFailure, 
  updateUserSuccess, 
  updateUserFailure,
} from './system.actions';

import { getAllUsers, updateUser } from '../../firebase/firebase.utils';

import * as ROLES from './../../constants/roles';

export function* fetchUsersAsync({ type }) {
  try {
    yield put(subActionStart(type));
    const users = yield call(getAllUsers);
    yield put(fetchUsersSuccess(users));
  } catch(error) {
    yield put(fetchUsersFailure(error));
  } finally {
    yield put(subActionStop(type));
  }
}

export function* updateUserAsync({type, payload: { userId, userDetails }}) {
  try {
    yield put(subActionStart(type));
    yield call(updateUser, userId, userDetails);
    const users = yield call(getAllUsers);
    yield put(updateUserSuccess(users));
  } catch(error) {
    yield put(updateUserFailure(error));
  } finally {
    yield put(subActionStop(type));
  }
}

export function* isAdmin({ type }) {
  const {user: { currentUser: { role }}} = yield select();

  if(role === ROLES.ADMIN) {
    yield put(actionStart(type));
    yield fetchUsersAsync({type});
    yield put(actionStop(type));
  }
}

export function* onFetchUsersStart() {
  yield takeLatest(
    SystemActionTypes.FETCH_USERS_START, 
    fetchUsersAsync
  );
}

export function* onUpdateUserStart() {
  yield takeLatest(
    SystemActionTypes.UPDATE_USER_START, 
    updateUserAsync
  );
}

export function* onSignInSuccess() {
  yield takeLatest(
    UserActionTypes.SIGN_IN_SUCCESS, 
    isAdmin
  );
}

export function* systemSagas() {
  yield all([
    call(onFetchUsersStart),
    call(onUpdateUserStart),
    call(onSignInSuccess),
  ]);
}
