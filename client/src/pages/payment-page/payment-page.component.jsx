import React, { useEffect, useRef } from 'react';
import { connect, batch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import CustomLoader from './../../components/custom-loader/custom-loader.component';
import PaymentHistory from './../../components/payment-history/payment-history.component';

import { fetchPaymentHistoryStart, updatePaymentHistoryStart } from './../../redux/payment-history/payment-history.actions';
import { updateStudentFundsStart } from './../../redux/student/student.actions';

import { isSubLoading } from './../../redux/ui/ui.selectors';

import './payment-page.styles.scss';

const reducer = (accumulator, currentValue) => 
  parseFloat(accumulator) + ((currentValue.type === 'Credit') ? 
    parseFloat(-1 * currentValue.amount) 
  : 
    parseFloat(currentValue.amount));

const PaymentPage = ({ isSubLoading, fetchPaymentHistoryStart, updatePaymentHistoryStart, updateStudentFundsStart }) => {
  const { userId } = useParams();
  const isMounted = useRef(false)

  useEffect(() => {
    if(!isMounted.current) {
      fetchPaymentHistoryStart(userId);
      isMounted.current = true;
    }
  }, [userId, isSubLoading, fetchPaymentHistoryStart]);

  const handleSubmit = (event, transactions) => {
    const funds = transactions.reduce(reducer, 0).toFixed(2);

    batch(() => {
      updatePaymentHistoryStart(userId, transactions);
      updateStudentFundsStart(userId, funds);
    });

    event.preventDefault();
  }

  return isMounted.current && !isSubLoading ? (
    <PaymentHistory handleSubmit={handleSubmit} />
  ) : (
    <CustomLoader message={'Loading'} />
  )
};

const mapStateToProps = createStructuredSelector({
  isSubLoading: isSubLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPaymentHistoryStart: (userId) =>
    dispatch(fetchPaymentHistoryStart(userId)),
  updatePaymentHistoryStart: (userId, transactions) => 
    dispatch(updatePaymentHistoryStart(userId, transactions)),
  updateStudentFundsStart: (userId, funds) =>
    dispatch(updateStudentFundsStart(userId, funds)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PaymentPage);
