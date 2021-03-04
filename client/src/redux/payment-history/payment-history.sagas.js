import { takeLatest, put, all, call, select } from 'redux-saga/effects';

import UserActionTypes from './../user/user.types';
import PaymentHistoryActionTypes from './payment-history.types';

import { actionStart, actionStop } from './../ui/ui.actions';
import { 
  fetchPaymentHistorySuccess,
  fetchPaymentHistoryFailure,
  updatePaymentHistorySuccess, 
  updatePaymentHistoryFailure,
  addPaymentHistoryTransactionSuccess,
  addPaymentHistoryTransactionFailure,
} from './payment-history.actions';

import { 
  getPaymentsByUserId,
  updatePaymentsDocument,
  addPaymentTransaction,
} from './../../firebase/firebase.utils';

import * as ROLES from './../../constants/roles';

export function* fetchPaymentHistoryAsync({ type, payload: { userId }}) {
  try {
   // yield put(actionStart(type));
    const paymentHistoryRef = yield call(getPaymentsByUserId, userId);

    yield put(fetchPaymentHistorySuccess({ ...paymentHistoryRef }));
  } catch(error) {
    yield put(fetchPaymentHistoryFailure(error));
  } 
  // finally {
  //   yield put(actionStop(type));
  // }
}

export function* updatePaymentHistoryAsync({type, payload: { userId, transactions }}) {
  try {
    yield put(actionStart(type));
    const paymentHistoryRef = yield call(updatePaymentsDocument, userId, transactions);

    yield put(updatePaymentHistorySuccess({ ...paymentHistoryRef }));
  } catch(error) {
    yield put(updatePaymentHistoryFailure(error));
  } finally {
    yield put(actionStop(type));
  }
}

export function* addPaymentHistoryTransactionAsync({type, payload: { userId, transaction }}) {
  try {
    yield put(actionStart(type));
    const paymentHistoryRef = yield call(addPaymentTransaction, userId, transaction);

    yield put(addPaymentHistoryTransactionSuccess({ ...paymentHistoryRef }));
  } catch(error) {
    yield put(addPaymentHistoryTransactionFailure(error));
  } finally {
    yield put(actionStop(type));
  }
}

export function* hasPaymentHistory({ type }) {
  const {user: { currentUser: { id, role }}} = yield select();

  if(role === ROLES.STUDENT || role === ROLES.INSTRUCTOR) {
    yield put(actionStart(type));
    yield fetchPaymentHistoryAsync({type, payload: { userId: id }});
    yield put(actionStop(type));
  }
}

export function* onFetchPaymentHistoryStart() {
  yield takeLatest(
    PaymentHistoryActionTypes.FETCH_PAYMENT_HISTORY_START, 
    fetchPaymentHistoryAsync
  );
}

export function* onUpdatePaymentHistoryStart() {
  yield takeLatest(
    PaymentHistoryActionTypes.UPDATE_PAYMENT_HISTORY_START, 
    updatePaymentHistoryAsync
  );
}

export function* onAddPaymentHistorTransactionStart() {
  yield takeLatest(
    PaymentHistoryActionTypes.ADD_PAYMENT_HISTORY_TRANSACTION_START, 
    addPaymentHistoryTransactionAsync
  );
}

export function* onSignInSuccess() {
  yield takeLatest(
    UserActionTypes.SIGN_IN_SUCCESS, 
    hasPaymentHistory
  );
}

export function* paymentHistorySagas() {
  yield all([
    call(onFetchPaymentHistoryStart),
    call(onUpdatePaymentHistoryStart),
    call(onAddPaymentHistorTransactionStart),
    call(onSignInSuccess),
  ]);
}
