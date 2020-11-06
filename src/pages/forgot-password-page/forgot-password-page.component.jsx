import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { passwordResetStart, resetErrorMessage } from '../../redux/user/user.actions';
import { userError } from './../../redux/user/user.selectors';

import * as ROUTES from '../../constants/routes';

import './forgot-password-page.styles.scss';
 
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
    <div className="modal-content-wrapper"> 
      <div className="label-header">Forgot Password</div>
      <form className='forgot-password-form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            name="email"
            value={email}
            onChange={onChange}
            type="text"
            placeholder="Email Address"
            className='form-control'
          />
        </div>
        <div className="form-actions"> 
          <div className="submit-row"> 
            <input 
              type="submit" 
              name="submit" 
              value="Reset Password" 
              className="btn btn-primary"
              disabled={isInvalid}  
            />
          </div>
          <div className='forgot-password-footer'>
            <span>or </span>
            <Link to={ROUTES.SIGN_IN} className="forgot-password-link">Sign In</Link>
          </div>
        </div> 

        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  error: userError,
});

const mapDispatchToProps = (dispatch) => ({
  resetErrorMessage: () => dispatch(resetErrorMessage()),
  passwordResetStart: (email) => 
    dispatch(passwordResetStart(email)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage);