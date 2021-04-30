import InstructorLessonActionTypes from './instructor-lesson.types';

export const fetchInstructorLessonsStart = (instructorCourseId) => ({
  type: InstructorLessonActionTypes.FETCH_INSTRUCTOR_LESSONS_START,
  payload: { instructorCourseId },
});

export const fetchInstructorLessonsSuccess = ({ chapters }) => ({
  type: InstructorLessonActionTypes.FETCH_INSTRUCTOR_LESSONS_SUCCESS,
  payload: chapters,
});

export const fetchInstructorLessonsFailure = (error) => ({
  type: InstructorLessonActionTypes.FETCH_INSTRUCTOR_LESSONS_FAILURE,
  payload: error,
});

export const fetchInstructorLessonStart = (lessonId) => ({
  type: InstructorLessonActionTypes.FETCH_INSTRUCTOR_LESSON_START,
  payload: { lessonId },
});

export const fetchInstructorLessonSuccess = (instructorLesson) => ({
  type: InstructorLessonActionTypes.FETCH_INSTRUCTOR_LESSON_SUCCESS,
  payload: instructorLesson,
});

export const fetchInstructorLessonFailure = (error) => ({
  type: InstructorLessonActionTypes.FETCH_INSTRUCTOR_LESSON_FAILURE,
  payload: error,
});

export const createInstructorLessonStart = (lessonDetails) => ({
  type: InstructorLessonActionTypes.CREATE_INSTRUCTOR_LESSON_START,
  payload: { lessonDetails },
});

export const createInstructorLessonSuccess = (instructorLessons) => ({
  type: InstructorLessonActionTypes.CREATE_INSTRUCTOR_LESSON_SUCCESS,
  payload: instructorLessons,
});

export const createInstructorLessonFailure = (error) => ({
  type: InstructorLessonActionTypes.CREATE_INSTRUCTOR_LESSON_FAILURE,
  payload: error,
});

export const updateInstructorLessonStart = (lessonId, lessonDetails) => ({
  type: InstructorLessonActionTypes.UPDATE_INSTRUCTOR_LESSON_START,
  payload: { lessonId, lessonDetails },
});

export const updateInstructorLessonSuccess = (instructorLessons) => ({
  type: InstructorLessonActionTypes.UPDATE_INSTRUCTOR_LESSON_SUCCESS,
  payload: instructorLessons,
});

export const updateInstructorLessonFailure = (error) => ({
  type: InstructorLessonActionTypes.UPDATE_INSTRUCTOR_LESSON_FAILURE,
  payload: error,
});
