import InstructorLessonActionTypes from './instructor-lesson.types';

const INITIAL_STATE = {
  'instructorLessons': {},
  'lessonDetails': {},
};

const instructorCourseReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case InstructorLessonActionTypes.FETCH_INSTRUCTOR_LESSON_START:
    case InstructorLessonActionTypes.CREATE_INSTRUCTOR_LESSON_START:
    case InstructorLessonActionTypes.UPDATE_INSTRUCTOR_LESSON_START:
    case InstructorLessonActionTypes.FETCH_INSTRUCTOR_LESSONS_START:
      return {
        ...state,
        error: null,
      };
    case InstructorLessonActionTypes.FETCH_INSTRUCTOR_LESSON_SUCCESS:
      return {
        ...state,
        lessonDetails: action.payload,
        error: null,
      };
    case InstructorLessonActionTypes.FETCH_INSTRUCTOR_LESSONS_SUCCESS:
    case InstructorLessonActionTypes.CREATE_INSTRUCTOR_LESSON_SUCCESS:
    case InstructorLessonActionTypes.UPDATE_INSTRUCTOR_LESSON_SUCCESS:
      return {
        ...state,
        lessonDetails: {},
        instructorLessons: action.payload,
        error: null,
      };
    case InstructorLessonActionTypes.FETCH_INSTRUCTOR_LESSONS_FAILURE:
    case InstructorLessonActionTypes.FETCH_INSTRUCTOR_LESSON_FAILURE:
    case InstructorLessonActionTypes.CREATE_INSTRUCTOR_LESSON_FAILURE:
    case InstructorLessonActionTypes.UPDATE_INSTRUCTOR_LESSON_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default instructorCourseReducer;
