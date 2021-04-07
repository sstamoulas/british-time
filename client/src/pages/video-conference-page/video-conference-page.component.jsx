import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';

import CustomLoader from './../../components/custom-loader/custom-loader.component';
import InstructorVideoChatContainer from './../../components/instructor-video-chat-container/instructor-video-chat-container.component';
import StudentVideoChatContainer from './../../components/student-video-chat-container/student-video-chat-container.component';

import { currentUser } from './../../redux/user/user.selectors';
import { isSubLoading } from './../../redux/ui/ui.selectors';

import * as ROLES from './../../constants/roles';

import './video-conference-page.styles.scss';

const VideoConferencePage = ({ currentUser, isSubLoading }) => {
  const { conferenceId } = useParams();

  return !isSubLoading ? (
    currentUser.role === ROLES.INSTRUCTOR ? (
      <InstructorVideoChatContainer conferenceId={conferenceId} />
    ) : (
      <StudentVideoChatContainer conferenceId={conferenceId} />
    )
  ) : (
    <CustomLoader message={'Loading'} />
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
  isSubLoading: isSubLoading,
});

export default connect(mapStateToProps)(VideoConferencePage);
