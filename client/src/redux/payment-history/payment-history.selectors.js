import { createSelector } from 'reselect';

const selectPaymentHistory = state => state.paymentHistory;

export const selectedTransactions = createSelector(
  [selectPaymentHistory],
  paymentHistory => paymentHistory.transactions
);
