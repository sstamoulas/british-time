import InstructorCourseActionTypes from './instructor-course.types';

export const fetchAllCoursesStart = () => ({
  type: InstructorCourseActionTypes.FETCH_ALL_COURSES_START,
});

export const fetchAllCoursesSuccess = (courses) => ({
  type: InstructorCourseActionTypes.FETCH_ALL_COURSES_SUCCESS,
  payload: courses,
});

export const fetchAllCoursesFailure = (error) => ({
  type: InstructorCourseActionTypes.FETCH_ALL_COURSES_FAILURE,
  payload: error,
});

export const fetchInstructorsByCourseIdStart = (courseId) => ({
  type: InstructorCourseActionTypes.FETCH_INSTRUCTORS_BY_COURSE_ID_START,
  payload: { courseId },
});

export const fetchInstructorsByCourseIdSuccess = (instructors) => ({
  type: InstructorCourseActionTypes.FETCH_INSTRUCTORS_BY_COURSE_ID_SUCCESS,
  payload: instructors,
});

export const fetchInstructorsByCourseIdFailure = (error) => ({
  type: InstructorCourseActionTypes.FETCH_INSTRUCTORS_BY_COURSE_ID_FAILURE,
  payload: error,
});

export const fetchInstructorCourseDetailsStart = () => ({
  type: InstructorCourseActionTypes.FETCH_INSTRUCTOR_COURSE_DETAILS_START,
});

export const fetchInstructorCourseDetailsSuccess = (instructorCourses) => ({
  type: InstructorCourseActionTypes.FETCH_INSTRUCTOR_COURSE_DETAILS_SUCCESS,
  payload: instructorCourses,
});

export const fetchInstructorCourseDetailsFailure = (error) => ({
  type: InstructorCourseActionTypes.FETCH_INSTRUCTOR_COURSE_DETAILS_FAILURE,
  payload: error,
});

export const fetchInstructorCourseDetailsByCourseIdStart = (courseId) => ({
  type: InstructorCourseActionTypes.FETCH_INSTRUCTOR_COURSE_DETAILS_BY_COURSE_ID_START,
  payload: { courseId },
});

export const fetchInstructorCourseDetailsByCourseIdSuccess = (instructorCourse) => ({
  type: InstructorCourseActionTypes.FETCH_INSTRUCTOR_COURSE_DETAILS_BY_COURSE_ID_SUCCESS,
  payload: instructorCourse,
});

export const fetchInstructorCourseDetailsByCourseIdFailure = (error) => ({
  type: InstructorCourseActionTypes.FETCH_INSTRUCTOR_COURSE_DETAILS_BY_COURSE_ID_FAILURE,
  payload: error,
});

export const createInstructorCourseDetailsStart = (courseDetails) => ({
  type: InstructorCourseActionTypes.CREATE_INSTRUCTOR_COURSE_DETAILS_START,
  payload: { courseDetails },
});

export const createInstructorCourseDetailsSuccess = (instructorCourses) => ({
  type: InstructorCourseActionTypes.CREATE_INSTRUCTOR_COURSE_DETAILS_SUCCESS,
  payload: instructorCourses,
});

export const createInstructorCourseDetailsFailure = (error) => ({
  type: InstructorCourseActionTypes.CREATE_INSTRUCTOR_COURSE_DETAILS_FAILURE,
  payload: error,
});

export const updateInstructorCourseRatingStart = (instructorCourseId, oldRating, rating) => ({
  type: InstructorCourseActionTypes.UPDATE_INSTRUCTOR_COURSE_RATING_START,
  payload: { instructorCourseId, oldRating, rating },
});

export const updateInstructorCourseRatingSuccess = () => ({
  type: InstructorCourseActionTypes.UPDATE_INSTRUCTOR_COURSE_RATING_SUCCESS,
});

export const updateInstructorCourseRatingFailure = (error) => ({
  type: InstructorCourseActionTypes.UPDATE_INSTRUCTOR_COURSE_RATING_FAILURE,
  payload: error,
});

export const updateInstructorCourseDetailsStart = (courseId, courseDetails) => ({
  type: InstructorCourseActionTypes.UPDATE_INSTRUCTOR_COURSE_DETAILS_START,
  payload: { courseId, courseDetails },
});

export const updateInstructorCourseDetailsSuccess = (instructorCourses) => ({
  type: InstructorCourseActionTypes.UPDATE_INSTRUCTOR_COURSE_DETAILS_SUCCESS,
  payload: instructorCourses,
});

export const updateInstructorCourseDetailsFailure = (error) => ({
  type: InstructorCourseActionTypes.UPDATE_INSTRUCTOR_COURSE_DETAILS_FAILURE,
  payload: error,
});
