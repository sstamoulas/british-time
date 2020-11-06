import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ForgotPasswordLink from './../../components/forgot-password-link/forgot-password-link.component';

import { signInStart, resetErrorMessage } from '../../redux/user/user.actions';
import { userError } from './../../redux/user/user.selectors';

import './sign-in-page.styles.scss';
 
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

  /*
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
  */

  return (
    <form className="signin-form">
      <div className="manage-fields-wrapper"> 
        <div className="form-field-container email">
          <label className="sr-only">Email</label>
          <div>
            <input name="email" maxLength="64" minLength="7" placeholder="Email" type="email" className="form-control" value="" />
          </div>
        </div> 
        <div className="form-field-container password"> 
          <label className="control-label">Password</label> 
          <div> 
            <input type="password" name="password" minLength="6" required="" maxLength="64" className="textInput form-control" placeholder="Password" /> 
          </div>
        </div>
      </div>
      <div className="form-actions"> 
        <div className="submit-row"> 
          <input type="submit" name="submit" value="Log In" className="btn btn-primary " />
          <span>or </span>
          <ForgotPasswordLink />
        </div>
      </div> 
    </form>
  );
}

const mapStateToProps = createStructuredSelector({
  error: userError,
});
 
const mapDispatchToProps = (dispatch) => ({
  resetErrorMessage: () => dispatch(resetErrorMessage()),
  signInStart: (userCredentials) => 
    dispatch(signInStart(userCredentials)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
