import React, { Fragment, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { selectedTransactions } from './../../redux/payment-history/payment-history.selectors';
import { currentUser } from './../../redux/user/user.selectors';

import * as ROLES from './../../constants/roles';

import './payment-history.styles.scss';

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

const PaymentHistory = ({ currentUser, userTransactions, handleSubmit }) => {
  const [state, setState] = useState({ 
    transactions: userTransactions, 
    editingTransactionId: '', 
    newTransactionId: '' 
  });
  const { transactions, editingTransactionId, newTransactionId } = state;

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

  const handleTransactionRemove = (event, transactionId) => {
    let newTransactions = [...transactions];
    let transactionExists = !isArrayEmpty(newTransactions.filter((transaction) => 
      transaction.transactionId === transactionId));

    newTransactions = newTransactions.filter((transaction) => transaction.transactionId !== transactionId);

    if(transactionExists) {
      handleSubmit(event, newTransactions);
    }
    else {
      setState(prevState => ({ ...prevState, transactions: newTransactions }));
      event.preventDefault();
    }
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
          transactions.map((transaction, index) => {
            return editingTransactionId === transaction.transactionId ? (
              <tr key={`${transaction.transactionId}-${index}`}>
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
                    <option value="Pending Debit">Pending Debit</option>
                  </select>
                </td>
                <td><input type='text' name='title' onChange={(e) => handleChange(e, transaction.transactionId)} value={transaction.title} /></td>
                <td><input type='number' name='amount' onChange={(e) => handleChange(e, transaction.transactionId)} value={transaction.amount} /></td>
                <td><input type='date' name='date' onChange={(e) => handleChange(e, transaction.transactionId)} value={transaction.date} /></td>
                <td>
                  <div className='link' onClick={(e) => handleSubmit(e, transactions)}>Save</div>
                  <div className='link' onClick={(event) => handleTransactionRemove(event, transaction.transactionId)}>Remove</div>
                </td>
              </tr>
            ) : (
              <tr key={`${transaction.transactionId}-${index}`}>
                <th scope='row'>{transaction.transactionId}</th>
                <td>{transaction.type}</td>
                <td>{transaction.title}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.date}</td>
                {
                  currentUser.role === ROLES.ADMIN && (
                    <td>
                      <div className='link' onClick={(event) => handleEditMode(event, transaction.transactionId)}>Edit</div>
                      <div className='link' onClick={(event) => handleTransactionRemove(event, transaction.transactionId)}>Remove</div>
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

export default connect(mapStateToProps)(PaymentHistory);
