import InstructorActionTypes from './instructor.types';

export const createCourseStart = (courseDetails) => ({
  type: InstructorActionTypes.CREATE_COURSE_START,
  payload: { courseDetails },
});

export const createCourseSuccess = () => ({
  type: InstructorActionTypes.CREATE_COURSE_SUCCESS,
});

export const createCourseFailure = (error) => ({
  type: InstructorActionTypes.CREATE_COURSE_FAILURE,
  payload: error,
});

export const editCourseStart = (courseDetails) => ({
  type: InstructorActionTypes.EDIT_COURSE_START,
  payload: { courseDetails },
});

export const editCourseSuccess = () => ({
  type: InstructorActionTypes.EDIT_COURSE_SUCCESS,
});

export const editCourseFailure = (error) => ({
  type: InstructorActionTypes.EDIT_COURSE_FAILURE,
  payload: error,
});
