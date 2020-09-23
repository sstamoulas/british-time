import { takeLatest, put, all, call, select } from 'redux-saga/effects';

import UserActionTypes from './../user/user.types';
import SystemActionTypes from './system.types';

import { actionStart, actionStop } from './../ui/ui.actions';
import { 
  fetchUsersSuccess, 
  fetchUsersFailure, 
  updateUserRoleSuccess, 
  updateUserRoleFailure
} from './system.actions';

import { getAllUsers, updateUserRole } from '../../firebase/firebase.utils';

import * as ROLES from './../../constants/roles';

export function* fetchUsersAsync({ type }) {
  try {
    yield put(actionStart(type));
    const users = yield call(getAllUsers);
    yield put(fetchUsersSuccess(users));
  } catch(error) {
    yield put(fetchUsersFailure(error));
  } finally {
    yield put(actionStop(type));
  }
}

export function* updateUserRoleAsync({type, payload: { userId, role }}) {
  try {
    yield put(actionStart(type));
    yield call(updateUserRole, userId, role);
    const users = yield call(getAllUsers);
    yield put(updateUserRoleSuccess(users));
  } catch(error) {
    yield put(updateUserRoleFailure(error));
  } finally {
    yield put(actionStop(type));
  }
}

export function* isAdmin({ type }) {
  const {user: { currentUser: { role }}} = yield select();

  if(role === ROLES.ADMIN) {
    yield fetchUsersAsync({type});
  }
}

export function* onFetchUsersStart() {
  yield takeLatest(
    SystemActionTypes.FETCH_USERS_START, 
    fetchUsersAsync
  );
}

export function* onUpdateUserRoleStart() {
  yield takeLatest(
    SystemActionTypes.UPDATE_USER_ROLE_START, 
    updateUserRoleAsync
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
    call(onUpdateUserRoleStart),
    call(onSignInSuccess),
  ]);
}
