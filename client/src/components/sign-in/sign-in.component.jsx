import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ForgotPasswordLink from './../../components/forgot-password-link/forgot-password-link.component';

import { signInStart, resetErrorMessage } from '../../redux/user/user.actions';
import { userError } from './../../redux/user/user.selectors';

import './sign-in.styles.scss';
 
const INITIAL_STATE = {
  email: '',
  password: '',
};

const SignIn = ({ history, signInStart, resetErrorMessage, error }) => {
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
    <form className="signin-form" onSubmit={onSubmit}>
      {
        error && <div className='alert error'>{error && <p>{error.message}</p>}</div>
      }
      <div className="manage-fields-wrapper"> 
        <div className="form-field-container email">
          <label className="sr-only">Email</label>
          <div>
            <input 
              type="email" 
              name="email" 
              maxLength="64" 
              minLength="7" 
              placeholder="Email" 
              className="form-control" 
              value={email} 
              onChange={onChange}
            />
          </div>
        </div> 
        <div className="form-field-container password"> 
          <label className="control-label">Password</label> 
          <div> 
            <input 
              type="password" 
              name="password" 
              minLength="6" 
              maxLength="64" 
              className="textInput form-control" 
              placeholder="Password" 
              value={password} 
              onChange={onChange}
            /> 
          </div>
        </div>
      </div>
      <div className="form-actions"> 
        <div className="submit-row"> 
          <input 
            type="submit" 
            name="submit" 
            value="Sign In" 
            className="btn btn-primary"
            disabled={isInvalid}  
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
