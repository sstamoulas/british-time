import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { signUpStart, resetErrorMessage } from '../../redux/user/user.actions';
import { currentUser, userError } from './../../redux/user/user.selectors';

import * as ROLES from './../../constants/roles';

import './sign-up.styles.scss';

const INITIAL_STATE = {
  userName: '', 
  email: '', 
  password: '', 
  passwordConfirmation: '', 
  isAdmin: false,
}

const SignUp = ({ currentUser, signUpStart, resetErrorMessage, error }) => {
  const [state, setState] = useState({ ...INITIAL_STATE });
  const { userName, email, password, passwordConfirmation, isAdmin } = state;

  useEffect(() => {
    return () => resetErrorMessage();
  }, [resetErrorMessage]);

  const onSubmit = event => {
    const role = ROLES.STUDENT;

    signUpStart({ userName, email, password, role });
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
    <form className="signup-form" onSubmit={onSubmit}>
      <div className="manage-fields-wrapper"> 
        <div className="form-field-container full-name">
          <label className="sr-only">Full Name</label>
          <div>
            <input 
              type="text" 
              name="userName" 
              maxLength="64" 
              minLength="7" 
              placeholder="Full Name" 
              className="form-control" 
              value={userName} 
              onChange={onChange}
            />
          </div>
        </div> 
        <div className="form-field-container email"> 
          <label className="control-label">Email Address</label> 
          <div> 
            <input 
              type="email" 
              name="email" 
              minLength="6" 
              maxLength="64" 
              className="textInput form-control" 
              placeholder="Email Address" 
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
        <div className="form-field-container password-confirmation"> 
          <label className="control-label">Confirm Password</label> 
          <div> 
            <input 
              type="password" 
              name="passwordConfirmation" 
              minLength="6" 
              maxLength="64" 
              className="textInput form-control" 
              placeholder="Confirm Password" 
              value={passwordConfirmation} 
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
            value="Sign Up" 
            className="btn btn-primary"
            disabled={isInvalid}  
          />
        </div>
      </div> 

      {error && <p>{error.message}</p>}
    </form>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
  error: userError,
});

const mapDispatchToProps = (dispatch) => ({
  resetErrorMessage: () => dispatch(resetErrorMessage()),
  signUpStart: (userCredentials) => 
    dispatch(signUpStart(userCredentials)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
