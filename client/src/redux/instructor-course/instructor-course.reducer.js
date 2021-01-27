import InstructorCourseActionTypes from './instructor-course.types';

const INITIAL_STATE = {
  'instructors': {},
  'instructorCourses': {},
  'courseDetails': {},
};

const instructorCourseReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case InstructorCourseActionTypes.FETCH_ALL_COURSES_START:
    case InstructorCourseActionTypes.FETCH_INSTRUCTORS_BY_COURSE_ID_START:
    case InstructorCourseActionTypes.FETCH_INSTRUCTOR_COURSE_DETAILS_START:
    case InstructorCourseActionTypes.CREATE_INSTRUCTOR_COURSE_DETAILS_START:
    case InstructorCourseActionTypes.UPDATE_INSTRUCTOR_COURSE_DETAILS_START:
    case InstructorCourseActionTypes.FETCH_INSTRUCTOR_COURSE_DETAILS_BY_COURSE_ID_START:
      return {
        ...state,
        error: null,
      };
    case InstructorCourseActionTypes.FETCH_INSTRUCTOR_COURSE_DETAILS_BY_COURSE_ID_SUCCESS:
      return {
        ...state,
        courseDetails: action.payload,
        error: null,
      };
    case InstructorCourseActionTypes.FETCH_INSTRUCTORS_BY_COURSE_ID_SUCCESS:
      return {
        ...state,
        instructors: action.payload,
        error: null,
      };
    case InstructorCourseActionTypes.FETCH_ALL_COURSES_SUCCESS:
    case InstructorCourseActionTypes.FETCH_INSTRUCTOR_COURSE_DETAILS_SUCCESS:
    case InstructorCourseActionTypes.CREATE_INSTRUCTOR_COURSE_DETAILS_SUCCESS:
    case InstructorCourseActionTypes.UPDATE_INSTRUCTOR_COURSE_DETAILS_SUCCESS:
      return {
        ...state,
        courseDetails: {},
        instructorCourses: action.payload,
        error: null,
      };
    case InstructorCourseActionTypes.FETCH_ALL_COURSES_FAILURE:
    case InstructorCourseActionTypes.FETCH_INSTRUCTORS_BY_COURSE_ID_FAILURE:
    case InstructorCourseActionTypes.FETCH_INSTRUCTOR_COURSE_DETAILS_BY_COURSE_ID_FAILURE:
    case InstructorCourseActionTypes.FETCH_INSTRUCTOR_COURSE_DETAILS_FAILURE:
    case InstructorCourseActionTypes.CREATE_INSTRUCTOR_COURSE_DETAILS_FAILURE:
    case InstructorCourseActionTypes.UPDATE_INSTRUCTOR_COURSE_DETAILS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default instructorCourseReducer;
