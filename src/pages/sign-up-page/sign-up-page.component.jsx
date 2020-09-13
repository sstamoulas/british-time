import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { signUpStart, resetErrorMessage } from '../../redux/user/user.actions';

import * as ROLES from './../../constants/roles';

const INITIAL_STATE = {
  userName: '', 
  email: '', 
  password: '', 
  passwordConfirmation: '', 
  isAdmin: false,
}

const SignUpPage = ({ currentUser, signUpStart, resetErrorMessage, error }) => {
  const [state, setState] = useState({ ...INITIAL_STATE });
  const { userName, email, password, passwordConfirmation, isAdmin } = state;

  useEffect(() => {
    return () => resetErrorMessage();
  }, [resetErrorMessage]);

  const onSubmit = event => {
    const roles = {};
 
    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    signUpStart({ userName, email, password, roles });
    event.preventDefault();
  }
 
  const onChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const onChangeCheckbox = event => {
    const { name, checked } = event.target;
    setState(prevState => ({ ...prevState, [name]: checked }));
  };

  const isInvalid =
    password !== passwordConfirmation ||
    password === '' ||
    email === '' ||
    userName === '';

  return (
    <form onSubmit={onSubmit}>
      <input
        name="userName"
        value={userName}
        onChange={onChange}
        type="text"
        placeholder="Full Name"
      />
      <input
        name="email"
        value={email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={password}
        onChange={onChange}
        type="password"
        placeholder="Password"
      />
      <input
        name="passwordConfirmation"
        value={passwordConfirmation}
        onChange={onChange}
        type="password"
        placeholder="Confirm Password"
      />
          <label>
            Admin:
            <input
              name="isAdmin"
              type="checkbox"
              checked={isAdmin}
              onChange={onChangeCheckbox}
            />
          </label>
      <button disabled={isInvalid} type="submit">
        Sign Up
      </button>

      {error && <p>{error.message}</p>}
    </form>
  )
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  error: state.user.error,
});

const mapDispatchToProps = (dispatch) => ({
  resetErrorMessage: () => dispatch(resetErrorMessage()),
  signUpStart: (userCredentials) => 
    dispatch(signUpStart(userCredentials)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
