import React from 'react';
import { connect } from 'react-redux';

import { signOutStart } from '../../redux/user/user.actions'
 
const SignOut = ({ signOutStart }) => (
  <button type="button" onClick={signOutStart}>
    Sign Out
  </button>
);

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
})
 
export default connect(null, mapDispatchToProps)(SignOut);
