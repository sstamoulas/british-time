import React from 'react';
import { connect } from 'react-redux';

import { signOutStart } from '../../redux/user/user.actions'
 
const SignOut = ({ signOutStart }) => (
  <a onClick={signOutStart} className="udlite-btn udlite-btn-large udlite-btn-ghost udlite-text-md mobile-nav--nav-item udlite-block-list-item udlite-block-list-item-large udlite-block-list-item-link">
    <span className="udlite-block-list-item-content">Sign Out</span>
  </a>
);

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
})
 
export default connect(null, mapDispatchToProps)(SignOut);
