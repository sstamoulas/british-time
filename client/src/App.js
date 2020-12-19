import React, { useEffect, useRef } from 'react';
import {Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import LandingPage from './pages/landing-page/landing-page.component';
import NotFoundPage from './pages/not-found-page/not-found-page.component';
import SignUpPage from './pages/sign-up-page/sign-up-page.component';
import SignInPage from './pages/sign-in-page/sign-in-page.component';
import ForgotPasswordPage from './pages/forgot-password-page/forgot-password-page.component';
import HomePage from './pages/home-page/home-page.component';
import AccountPage from './pages/account-page/account-page.component';
import CoursesPage from './pages/courses-page/courses-page.component';
import AdminPage from './pages/admin-page/admin-page.component';
import InstructorPage from './pages/instructor-page/instructor-page.component';
import StudentPage from './pages/student-page/student-page.component';
import CourseCreatePage from './pages/course-create-page/course-create-page.component';
import CourseUpdatePage from './pages/course-update-page/course-update-page.component';
import LessonCreatePage from './pages/lesson-create-page/lesson-create-page.component';
import LessonUpdatePage from './pages/lesson-update-page/lesson-update-page.component';
import CourseDetailsPage from './pages/course-details-page/course-details-page.component';
import StudentCoursePage from './pages/student-course-page/student-course-page.component';
import StudentLessonPage from './pages/student-lesson-page/student-lesson-page.component';

import Navigation from './components/navigation/navigation.component';
import Footer from './components/footer/footer.component';
import CustomLoader from './components/custom-loader/custom-loader.component';
import PrivateRoute from './components/private-route/private-route.component';
import CustomRoute from './components/custom-route/custom-route.component';
import CreateInstructorCourse from './components/create-instructor-course/create-instructor-course.component';
import UpdateInstructorCourse from './components/update-instructor-course/update-instructor-course.component';

import * as ROUTES from './constants/routes';
import * as ROLES from './constants/roles';

import { checkUserSessionStart } from './redux/user/user.actions';
import { currentUser } from './redux/user/user.selectors';
import { isLoading } from './redux/ui/ui.selectors';

import './App.styles.scss';

const App = ({ currentUser, checkUserSessionStart, isLoading }) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      checkUserSessionStart();
      isMounted.current = true;
    }
  }, [checkUserSessionStart]);

  return isMounted.current && !isLoading ?
    (
      <div className='main-container'>
        <Navigation />
        <Switch>
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route exact path={ROUTES.COURSES} component={CoursesPage} />
          <Route exact path={ROUTES.DETAILS_COURSE} component={CourseDetailsPage} />
          <CustomRoute
            exact
            path={ROUTES.SIGN_IN}
            condition={currentUser}
            component={SignInPage} 
          />
          <CustomRoute
            exact
            path={ROUTES.SIGN_UP}
            condition={currentUser}
            component={SignUpPage} 
          />
          <CustomRoute
            exact
            path={ROUTES.FORGOT_PASSWORD}
            condition={currentUser}
            component={ForgotPasswordPage} 
          />
          <PrivateRoute 
            exact
            path={ROUTES.HOME} 
            condition={currentUser}
            component={HomePage}
          />
          <PrivateRoute 
            exact
            path={ROUTES.ACCOUNT}
            condition={currentUser}
            component={AccountPage}
          />
          <PrivateRoute 
            exact
            path={ROUTES.INSTRUCTOR}
            condition={currentUser && currentUser.role === ROLES.INSTRUCTOR}
            component={InstructorPage}
          />
          <PrivateRoute 
            exact
            path={ROUTES.CREATE_INSTRUCTOR_COURSE}
            condition={currentUser && currentUser.role === ROLES.INSTRUCTOR}
            component={CreateInstructorCourse}
          />
          <PrivateRoute 
            exact
            path={ROUTES.UPDATE_INSTRUCTOR_COURSE}
            condition={currentUser && currentUser.role === ROLES.INSTRUCTOR}
            component={UpdateInstructorCourse}
          />
          <PrivateRoute 
            exact
            path={ROUTES.CREATE_LESSON}
            condition={currentUser && currentUser.role === ROLES.INSTRUCTOR}
            component={LessonCreatePage}
          />
          <PrivateRoute 
            exact
            path={ROUTES.UPDATE_LESSON}
            condition={currentUser && currentUser.role === ROLES.INSTRUCTOR}
            component={LessonUpdatePage}
          />
          <PrivateRoute 
            exact
            path={ROUTES.CREATE_COURSE}
            condition={currentUser && currentUser.role === ROLES.ADMIN}
            component={CourseCreatePage}
          />
          <PrivateRoute 
            exact
            path={ROUTES.UPDATE_COURSE}
            condition={currentUser && currentUser.role === ROLES.ADMIN}
            component={CourseUpdatePage}
          />
          <PrivateRoute 
            exact
            path={ROUTES.ADMIN}
            condition={currentUser && currentUser.role === ROLES.ADMIN}
            component={AdminPage}
          />
          <PrivateRoute 
            exact
            path={ROUTES.STUDENT}
            condition={currentUser && currentUser.role === ROLES.STUDENT}
            component={StudentPage}
          />
          <PrivateRoute 
            exact
            path={ROUTES.STUDENT_COURSE}
            condition={currentUser && currentUser.role === ROLES.STUDENT}
            component={StudentCoursePage}
          />
          <PrivateRoute 
            exact
            path={ROUTES.STUDENT_LESSON_DETAILS}
            condition={currentUser && currentUser.role === ROLES.STUDENT}
            component={StudentLessonPage}
          />
          <Route
            path='/*' 
            component={NotFoundPage}
          />
        </Switch>
        <Footer />
      </div>
    )
  :
    <CustomLoader message={'Loading'} />
};

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
  isLoading: isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSessionStart: () => dispatch(checkUserSessionStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);