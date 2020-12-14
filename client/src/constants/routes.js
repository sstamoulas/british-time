export const LANDING = '/';
export const SIGN_UP = '/sign-up';
export const SIGN_IN = '/sign-in';
export const FORGOT_PASSWORD = '/forgot-password';

export const HOME = '/home';
export const ACCOUNT = '/account';

export const ADMIN = '/admin';

export const INSTRUCTOR = '/instructor';
export const COURSES = '/courses';
export const CREATE_COURSE = '/course/new';
export const UPDATE_COURSE = '/course/:courseId';
export const DETAILS_COURSE = '/course/details/:courseId';
export const CREATE_INSTRUCTOR_COURSE = '/instructor/course/new';
export const UPDATE_INSTRUCTOR_COURSE = '/instructor/course/:courseId';
export const CREATE_LESSON = '/instructor/course/:courseId/lesson/new/';
export const UPDATE_LESSON = '/instructor/course/:courseId/lesson/:lessonId/';

export const STUDENT = '/student';
export const STUDENT_COURSE = '/student/course/:courseId';
export const STUDENT_LESSON_DETAILS = '/course/:instructorCourseId/lesson/details/:lessonId';
