import CourseActionTypes from './course.types';

export const createCourseStart = (courseDetails) => ({
  type: CourseActionTypes.CREATE_COURSE_START,
  payload: { courseDetails },
});

export const createCourseSuccess = (courses) => ({
  type: CourseActionTypes.CREATE_COURSE_SUCCESS,
});

export const createCourseFailure = (error) => ({
  type: CourseActionTypes.CREATE_COURSE_FAILURE,
  payload: error,
});

export const updateCourseStart = (courseId, courseDetails) => ({
  type: CourseActionTypes.UPDATE_COURSE_START,
  payload: { courseId, courseDetails },
});

export const updateCourseSuccess = (courses) => ({
  type: CourseActionTypes.UPDATE_COURSE_SUCCESS,
});

export const updateCourseFailure = (error) => ({
  type: CourseActionTypes.UPDATE_COURSE_FAILURE,
  payload: error,
});

export const fetchCoursesStart = () => ({
  type: CourseActionTypes.FETCH_COURSES_START,
});

export const fetchCoursesSuccess = (courses) => ({
  type: CourseActionTypes.FETCH_COURSES_SUCCESS,
  payload: courses,
});

export const fetchCoursesFailure = (error) => ({
  type: CourseActionTypes.FETCH_COURSES_FAILURE,
  payload: error,
});

export const fetchCourseByIdStart = (courseId) => ({
  type: CourseActionTypes.FETCH_COURSE_BY_ID_START,
  payload: { courseId },
});

export const fetchCourseByIdSuccess = (currentCourse) => ({
  type: CourseActionTypes.FETCH_COURSE_BY_ID_SUCCESS,
  payload: currentCourse,
});

export const fetchCourseByIdFailure = (error) => ({
  type: CourseActionTypes.FETCH_COURSE_BY_ID_FAILURE,
  payload: error,
});
