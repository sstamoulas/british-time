import StudentCourseActionTypes from './student-course.types';

export const fetchStudentCoursesStart = () => ({
  type: StudentCourseActionTypes.FETCH_STUDENT_COURSES_START,
});

export const fetchStudentCoursesSuccess = (studentCourses) => ({
  type: StudentCourseActionTypes.FETCH_STUDENT_COURSES_SUCCESS,
  payload: studentCourses,
});

export const fetchStudentCoursesFailure = (error) => ({
  type: StudentCourseActionTypes.FETCH_STUDENT_COURSES_FAILURE,
  payload: error,
});

export const fetchStudentCourseStart = (courseId) => ({
  type: StudentCourseActionTypes.FETCH_STUDENT_COURSE_START,
  payload: { courseId },
});

export const fetchStudentCourseSuccess = (studentCourse) => ({
  type: StudentCourseActionTypes.FETCH_STUDENT_COURSE_SUCCESS,
  payload: studentCourse,
});

export const fetchStudentCourseFailure = (error) => ({
  type: StudentCourseActionTypes.FETCH_STUDENT_COURSE_FAILURE,
  payload: error,
});

export const createStudentCourseStart = (courseDetails) => console.log(courseDetails) || ({
  type: StudentCourseActionTypes.CREATE_STUDENT_COURSE_START,
  payload: { courseDetails },
});

export const createStudentCourseSuccess = (studentCourses) => ({
  type: StudentCourseActionTypes.CREATE_STUDENT_COURSE_SUCCESS,
  payload: studentCourses,
});

export const createStudentCourseFailure = (error) => ({
  type: StudentCourseActionTypes.CREATE_STUDENT_COURSE_FAILURE,
  payload: error,
});

export const updateStudentCourseStart = (courseId, courseDetails) => ({
  type: StudentCourseActionTypes.UPDATE_STUDENT_COURSE_START,
  payload: { courseId, courseDetails },
});

export const updateStudentCourseSuccess = (studentCourses) => ({
  type: StudentCourseActionTypes.UPDATE_STUDENT_COURSE_SUCCESS,
  payload: studentCourses,
});

export const updateStudentCourseFailure = (error) => ({
  type: StudentCourseActionTypes.UPDATE_STUDENT_COURSE_FAILURE,
  payload: error,
});
