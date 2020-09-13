import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { signInStart, resetErrorMessage } from '../../redux/user/user.actions';
 
const INITIAL_STATE = {
  email: '',
  password: '',
};

const SignInPage = ({ history, signInStart, resetErrorMessage, error }) => {
  const [state, setState] = useState({ ...INITIAL_STATE, error });
  const { email, password } = state;

  useEffect(() => {
    return () => resetErrorMessage();
  }, [resetErrorMessage]);

  const onSubmit = event => {
    signInStart({ email, password });
    event.preventDefault();
  };
 
  const onChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const isInvalid = password === '' || email === '';

  return (
    <form onSubmit={onSubmit}>
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
      <button disabled={isInvalid} type="submit">
        Sign In
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
  signInStart: (userCredentials) => 
    dispatch(signInStart(userCredentials)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
