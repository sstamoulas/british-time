import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { passwordResetStart, resetErrorMessage } from '../../redux/user/user.actions';
 
const INITIAL_STATE = {
  email: '',
};

const ForgotPasswordPage = ({ passwordResetStart, resetErrorMessage, error }) => {
  const [state, setState] = useState({ ...INITIAL_STATE });
  const { email } = state;
  const isInvalid = email === '';

  useEffect(() => {
    return () => resetErrorMessage();
  }, [resetErrorMessage]);
  
  const onSubmit = event => {
    passwordResetStart(email)
    event.preventDefault();
  };
 
  const onChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        value={email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
}

const mapStateToProps = (state) => ({
  error: state.user.error,
});

const mapDispatchToProps = (dispatch) => ({
  resetErrorMessage: () => dispatch(resetErrorMessage()),
  passwordResetStart: (email) => 
    dispatch(passwordResetStart(email)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage);