import PaymentHistoryActionTypes from './payment-history.types';

const INITIAL_STATE = {
  'transactions': [],
};

const paymentHistoryReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case PaymentHistoryActionTypes.UPDATE_PAYMENT_HISTORY_START:
    case PaymentHistoryActionTypes.FETCH_PAYMENT_HISTORY_START:
    case PaymentHistoryActionTypes.ADD_PAYMENT_HISTORY_TRANSACTION_START:
    case PaymentHistoryActionTypes.ADD_PAYMENT_HISTORY_TRANSACTION_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case PaymentHistoryActionTypes.UPDATE_PAYMENT_HISTORY_SUCCESS:
    case PaymentHistoryActionTypes.FETCH_PAYMENT_HISTORY_SUCCESS:
      return {
        ...state,
        transactions: action.payload,
        error: null,
      };
    case PaymentHistoryActionTypes.UPDATE_PAYMENT_HISTORY_FAILURE:
    case PaymentHistoryActionTypes.FETCH_PAYMENT_HISTORY_FAILURE:
    case PaymentHistoryActionTypes.ADD_PAYMENT_HISTORY_TRANSACTION_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default paymentHistoryReducer;
