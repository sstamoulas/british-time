import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Chat from './../chat/chat.component';

import { selectInstructorCoursesForManaging } from './../../redux/instructor-course/instructor-course.selectors';
import { currentUser } from './../../redux/user/user.selectors';

import { levels } from './../../constants/constants';
import { database } from "./../../firebase/firebase.utils";

import './notifications.styles.scss';

const INITIAL_STATE = {
  users: [],
  readError: null,
  writeError: null
}

const Notifications = ({ currentUser, instructorCourses }) => {
  const [state, setState] = useState({ ...INITIAL_STATE })

  useEffect(() => {
    const target = document.querySelectorAll('.active');
    if(target) {
      for(let i = 0; i < target.length; i++) {
        const panel = target[i].nextElementSibling;
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    }
  });

  useEffect(() => {
    const init = async () => {
      setState(prevState => ({ ...prevState, readError: null }));
      try {
        Object.keys(instructorCourses).length &&
          Object.entries(instructorCourses).map(([index, instructorCourse]) => {
            let users = [];
            
            database.ref(`${instructorCourse.id}`).on("value", snapshot => {
              snapshot.forEach((snap) => {
                if(!users.includes(`${instructorCourse.id}/${snap.key}`)) {
                  users.push(`${instructorCourse.id}/${snap.key}`)
                }
              });

              setState(prevState => ({ ...prevState, users }));
            });
          })
      } catch (error) {
        setState(prevState => ({ ...prevState, readError: error.message }));
      }
    }

    init();

    return () => setState({ ...INITIAL_STATE });
  }, [instructorCourses])

  const handleAccordion = (event) => {
    const target = event.target;
    const panel = target.nextElementSibling;
    target.classList.toggle('active');

    panel.classList.toggle('hidden');

    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = (panel.scrollHeight + 1000) + "px";
    } 
  }

  const handleSubAccordion = (event) => {
    const target = event.target;
    const panel = target.nextElementSibling;
    target.classList.toggle('active');

    panel.classList.toggle('hidden');

    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = (panel.scrollHeight + 1000) + "px";
    } 
  }

  return (
    <div className="container">
      <h3 className='course-label'>Your Notifications</h3>
      <div className="card-wrapper">
        <Fragment>
        {
          Object.keys(instructorCourses).length && state.users.length ?
            Object.entries(instructorCourses).map(([index, instructorCourse]) => (
              <div key={instructorCourse.id}>
                <div className="accordion" onClick={handleAccordion}>Course: {instructorCourse.courseName} - {levels[instructorCourse.levelId].text} {levels[instructorCourse.levelId].headline}</div>
                <div className="accordion-panel hidden">
                {
                  state.users.map((user) => (
                    <div key={user}>
                      <div className="accordion" onClick={handleSubAccordion}>User Name: {user.substring(user.indexOf('/') + 1, user.indexOf('-'))}</div>
                      <div className="sub-accordion-panel hidden">
                        <Chat key={user} room={user} />
                      </div>
                    </div>
                  ))
                }
                </div>
              </div>
            ))
          :
            <div>You have not created any courses</div>
        }
        </Fragment>
      </div>
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
  instructorCourses: selectInstructorCoursesForManaging,
});

export default connect(mapStateToProps)(Notifications);
