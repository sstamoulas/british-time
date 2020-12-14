import StudentCourseActionTypes from './student-course.types';

const INITIAL_STATE = {
  'studentCourses': {},
  'courseDetails': {},
};

const studentCourseReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case StudentCourseActionTypes.FETCH_STUDENT_COURSES_START:
    case StudentCourseActionTypes.FETCH_STUDENT_COURSE_START:
    case StudentCourseActionTypes.CREATE_STUDENT_COURSE_START:
    case StudentCourseActionTypes.UPDATE_STUDENT_COURSE_START:
      return {
        ...state,
        error: null,
      };
    case StudentCourseActionTypes.FETCH_STUDENT_COURSE_SUCCESS:
      return {
        ...state,
        courseDetails: action.payload,
        error: null,
      };
    case StudentCourseActionTypes.FETCH_STUDENT_COURSES_SUCCESS:
    case StudentCourseActionTypes.CREATE_STUDENT_COURSE_SUCCESS:
    case StudentCourseActionTypes.UPDATE_STUDENT_COURSE_SUCCESS:
      return {
        ...state,
        courseDetails: {},
        studentCourses: action.payload,
        error: null,
      };
    case StudentCourseActionTypes.FETCH_STUDENT_COURSES_FAILURE:
    case StudentCourseActionTypes.FETCH_STUDENT_COURSE_FAILURE:
    case StudentCourseActionTypes.CREATE_STUDENT_COURSE_FAILURE:
    case StudentCourseActionTypes.UPDATE_STUDENT_COURSE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default studentCourseReducer;
