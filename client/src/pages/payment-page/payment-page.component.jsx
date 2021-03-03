import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect, batch } from 'react-redux';

import { fetchPaymentHistoryStart, updatePaymentHistoryStart } from './../../redux/payment-history/payment-history.actions';
import { updateStudentFundsStart } from './../../redux/student/student.actions';

import { selectedTransactions } from './../../redux/payment-history/payment-history.selectors';
import { currentUser } from './../../redux/user/user.selectors';

import * as ROUTES from './../../constants/routes';
import * as ROLES from './../../constants/roles';

const EMPTY_TRANSACTION = {
  title: '',
  type: '',
  amount: '',
  date: '',
  transactionId: '',
}

const isArrayEmpty = (obj) => {
  return obj.length === 0
}

const reducer = (accumulator, currentValue) => parseFloat(accumulator) + ((currentValue.type === 'Credit') ? parseFloat(-1 * currentValue.amount) : parseFloat(currentValue.amount));

const PaymentPage = ({ currentUser, userTransactions, fetchPaymentHistoryStart, updatePaymentHistoryStart, updateStudentFundsStart }) => {
  const { userId } = useParams();
  const isMounted = useRef(false)
  const [state, setState] = useState({ transactions: userTransactions, editingTransactionId: '', newTransactionId: '' });
  const { transactions, editingTransactionId, newTransactionId } = state;

  useEffect(() => {
    // if(userTransactions.length > 0 && transactions.length == 0) {
    //   setState(prevState => ({ ...prevState, transactions: userTransactions }));
    // }
    // else 
    if(!isMounted.current) {
      fetchPaymentHistoryStart(userId);
      isMounted.current = true;
    }
    else {
      setState(prevState => ({ ...prevState, transactions: userTransactions }));
    }
  }, [userId, userTransactions, fetchPaymentHistoryStart]);

  const handleChange = (event, transactionId) => {
    const { name, value } = event.target;

    if(transactionId != null) {
      const newTransactions = [...transactions];
      const index = transactions.findIndex((transaction) => transaction.transactionId === transactionId);
      newTransactions[index] = { ...newTransactions[index], [name]: value };

      if(name === 'transactionId') {
        setState(prevState => ({ 
          ...prevState, 
          transactions: newTransactions, 
          editingTransactionId: value,
        }));
      }
      else {
        setState(prevState => ({ ...prevState, transactions: newTransactions }));
      }
    }
    else {
      setState(prevState => ({ ...prevState, [name]: value }));
    }
  }

  const handleTransactionChange = (event) => {
    const funds = transactions.reduce(reducer, 0).toFixed(2);

    batch(() => {
      updatePaymentHistoryStart(userId, transactions);
      updateStudentFundsStart(userId, funds);
    });

    event.preventDefault();
  }

  const handleTransactionRemove = (event, transactionId) => {
    let newTransactions = [...transactions];
    let transactionExists = !isArrayEmpty(userTransactions.filter((transaction) => 
      transaction.transactionId === transactionId));

    newTransactions = newTransactions.filter((transaction) => transaction.transactionId !== transactionId);

    if(transactionExists) {
      const funds = transactions.reduce(reducer, 0).toFixed(2);

      batch(() => {
        updatePaymentHistoryStart(userId, newTransactions);
        updateStudentFundsStart(userId, funds);
      });
    }
    else {
      setState(prevState => ({ ...prevState, transactions: newTransactions }));
    }

    event.preventDefault();
  }

  const handleAddTransaction = (transactionId) => {
    let newTransactions = [...transactions];
    newTransactions.push({ ...EMPTY_TRANSACTION, transactionId });

    setState(prevState => ({ 
      ...prevState, 
      transactions: newTransactions, 
      editingTransactionId: transactionId, 
      newTransactionId: '' 
    }));
  }

  const handleEditMode = (event, transactionId) => {
    setState(prevState => ({ ...prevState, editingTransactionId: transactionId }));
  }

  return (
    <div style={{margin: '20px'}}>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope='col'>Transaction Id</th>
            <th scope='col'>Type</th>
            <th scope='col'>Reason</th>
            <th scope='col'>Amount</th>
            <th scope='col'>Date</th>
            {
              currentUser.role === ROLES.ADMIN && (
                <th scope='col'>Action</th>
              )
            }
          </tr>
        </thead>
        <tbody>
        {
          transactions &&
          transactions.map((transaction) => {
            return editingTransactionId === transaction.transactionId ? (
              <tr key={transaction.transactionId}>
                <th scope='row'>
                  <input type='text' name='transactionId' onChange={(e) => handleChange(e, transaction.transactionId)} value={transaction.transactionId} />
                </th>
                <td>
                  <select name='type' value={transaction.type} onChange={(e) => handleChange(e, transaction.transactionId)}>
                    <option defaultValue hidden> 
                      Select a Level 
                    </option> 
                    <option value="Debit">Debit</option>
                    <option value="Credit">Credit</option>
                  </select>
                </td>
                <td><input type='text' name='title' onChange={(e) => handleChange(e, transaction.transactionId)} value={transaction.title} /></td>
                <td><input type='number' name='amount' onChange={(e) => handleChange(e, transaction.transactionId)} value={transaction.amount} /></td>
                <td><input type='date' name='date' onChange={(e) => handleChange(e, transaction.transactionId)} value={transaction.date} /></td>
                <td>
                  <a onClick={handleTransactionChange}>Save</a>
                  <a onClick={(event) => handleTransactionRemove(event, transaction.transactionId)}>Remove</a>
                </td>
              </tr>
            ) : (
              <tr key={transaction.transactionId}>
                <th scope='row'>{transaction.transactionId}</th>
                <td>{transaction.type}</td>
                <td>{transaction.title}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.date}</td>
                {
                  currentUser.role === ROLES.ADMIN && (
                    <td>
                      <a onClick={(event) => handleEditMode(event, transaction.transactionId)}>Edit</a>
                      <a onClick={(event) => handleTransactionRemove(event, transaction.transactionId)}>Remove</a>
                    </td>
                  )
                }
              </tr>
            )
          })
        }
        </tbody>
      </table>
      {
        currentUser.role === ROLES.ADMIN && (
          <Fragment>
            <input type='text' name='newTransactionId' value={newTransactionId} onChange={handleChange} />
            <button type='button' onClick={() => handleAddTransaction(newTransactionId)}>Add New Transaction</button>
          </Fragment>
        )
      }
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
  userTransactions: selectedTransactions,
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
