import PaymentHistoryActionTypes from './payment-history.types';

export const fetchPaymentHistoryStart = (userId) => ({
  type: PaymentHistoryActionTypes.FETCH_PAYMENT_HISTORY_START,
  payload: { userId },
});

export const fetchPaymentHistorySuccess = ({transactions}) => ({
  type: PaymentHistoryActionTypes.FETCH_PAYMENT_HISTORY_SUCCESS,
  payload: transactions,
});

export const fetchPaymentHistoryFailure = (error) => ({
  type: PaymentHistoryActionTypes.FETCH_PAYMENT_HISTORY_FAILURE,
  payload: error,
});

export const updatePaymentHistoryStart = (userId, transactions) => ({
  type: PaymentHistoryActionTypes.UPDATE_PAYMENT_HISTORY_START,
  payload: { userId, transactions },
});

export const updatePaymentHistorySuccess = ({transactions}) => ({
  type: PaymentHistoryActionTypes.UPDATE_PAYMENT_HISTORY_SUCCESS,
  payload: transactions,
});

export const updatePaymentHistoryFailure = (error) => ({
  type: PaymentHistoryActionTypes.UPDATE_PAYMENT_HISTORY_FAILURE,
  payload: error,
});
