import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Zoom from './../../components/zoom/zoom.component';
import StudentCourseNavigation from './../../components/student-course-navigation/student-course-navigation.component';
import StudentCourseAnnouncements from './../../components/student-course-announcements/student-course-announcements.component';
import StudentCourseContent from './../../components/student-course-content/student-course-content.component';
import StudentCourseOverview from './../../components/student-course-overview/student-course-overview.component';
import StudentCourseSidebar from './../../components/student-course-sidebar/student-course-sidebar.component';
import StudentCourseLesson from './../../components/student-course-lesson/student-course-lesson.component';

import { currentUser } from './../../redux/user/user.selectors';
import { instructorLessons } from './../../redux/instructor-lesson/instructor-lesson.selectors';

import './student-course.styles.scss';

const hasLiveSession = true;

const StudentCourse = ({ currentUser, instructorLessons }) => {
  const lessonAccordion = useRef(undefined);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');
  const [currentLesson, setCurrentLesson] = useState(instructorLessons[0].lessons[0]);
  const [isLiveSessionOpen, setIsLiveSessionOpen] = useState(false);

  useEffect(() => {
    lessonAccordion.current = document.querySelectorAll('.section--section-heading--2k6aW');
    lessonAccordion.current.forEach((elem) => elem.addEventListener("click", openClose));

    function openClose() {
      let accordion = this;

      if(accordion.nextElementSibling.style.display === 'none') {
        accordion.nextElementSibling.style.display = 'block';
        accordion.children[1].classList.remove('udi-angle-down');
        accordion.children[1].classList.add('udi-angle-up');
      }
      else {
        accordion.nextElementSibling.style.display = 'none';
        accordion.children[1].classList.remove('udi-angle-up');
        accordion.children[1].classList.add('udi-angle-down');
      }
    }

    return () => lessonAccordion.current.forEach((elem) => elem.removeEventListener("click", openClose));
  }, [lessonAccordion]);

  const loadNewContent = (lesson) => {
    setCurrentLesson(lesson)
  }

  const handleClick = (event) => {
    setActiveTab(event.target.textContent)
  }

  const openLiveSession = () => {
    document.querySelector('#zmmtg-root').style.display = '';
    document.querySelector('#zmmtg-root').style.backgroundColor = 'black';
    document.querySelector('#root').style.display = 'none';
    setIsLiveSessionOpen(true);
  }

  const sortInstructorLessons = (a, b) => {
    if(a.createdAt.seconds > b.createdAt.seconds) {
      return 1;
    }
    else if(a.createdAt.seconds < b.createdAt.seconds) {
      return -1;
    }
    else {
      return 0;
    }
  }

  instructorLessons.sort(sortInstructorLessons);

  return (
    <div className={`app--column-container--3AItG ${!isSidebarVisible ? 'app--no-sidebar--1naXE' : ''}`}>
      <div className="app--content-column--HC_i1">
         <StudentCourseLesson currentLesson={currentLesson} />
         <StudentCourseSidebar 
          activeTab={activeTab} 
          loadNewContent={loadNewContent} 
          isSidebarVisible={isSidebarVisible} 
          setIsSidebarVisible={setIsSidebarVisible}
          instructorLessons={instructorLessons} 
        />
        {
          isLiveSessionOpen && (
            <Zoom 
              meetingNumber={process.env.REACT_APP_ZOOM_MEETING_NUMBER} 
              userName={currentUser.userName} 
              userEmail={currentUser.email} 
              passWord={process.env.REACT_APP_ZOOM_MEETING_PASSWORD} 
              role={0} 
            />
          )
        }
         <div className="app--row--1ydzX app--dashboard--dXVM6">
            <div className="app--row-content--1lH7B">
               <div className="app--dashboard-content--r2Ce9">
                  <div className="dashboard--wrapper--2rdgA">
                     <div className="dashboard--nav-bar-row--nvapi">
                        <div className="udlite-in-udheavy dashboard--tabs-container--35kox">
                           <div className="tabs--tabs-container--3KpSm">
                              <StudentCourseNavigation 
                                activeTab={activeTab} 
                                isSidebarVisible={isSidebarVisible}
                                hasLiveSession={hasLiveSession}
                                openLiveSession={openLiveSession}
                                handleClick={handleClick} 
                              />
                              <StudentCourseContent 
                                activeTab={activeTab} 
                                instructorLessons={instructorLessons}
                                isSidebarVisible={isSidebarVisible} 
                                loadNewContent={loadNewContent} 
                              />
                              <StudentCourseOverview 
                                activeTab={activeTab} 
                                isSidebarVisible={isSidebarVisible} 
                              />
                              <StudentCourseAnnouncements 
                                activeTab={activeTab} 
                              />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
  instructorLessons: instructorLessons,
});

export default connect(mapStateToProps)(StudentCourse);
