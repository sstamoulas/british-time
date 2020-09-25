import CourseActionTypes from './course.types';

export const createCourseStart = (courseDetails) => ({
  type: CourseActionTypes.CREATE_COURSE_START,
  payload: { courseDetails },
});

export const createCourseSuccess = (courses) => ({
  type: CourseActionTypes.CREATE_COURSE_SUCCESS,
  payload: { courses },
});

export const createCourseFailure = (error) => ({
  type: CourseActionTypes.CREATE_COURSE_FAILURE,
  payload: error,
});

export const updateCourseStart = (courseDetails) => ({
  type: CourseActionTypes.UPDATE_COURSE_START,
  payload: { courseDetails },
});

export const updateCourseSuccess = (courses) => ({
  type: CourseActionTypes.UPDATE_COURSE_SUCCESS,
  payload: { courses },
});

export const updateCourseFailure = (error) => ({
  type: CourseActionTypes.UPDATE_COURSE_FAILURE,
  payload: error,
});
