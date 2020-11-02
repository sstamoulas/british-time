import { createSelector } from 'reselect';

const selectStudentCourses = state => state.studentCourses;

export const studentCourses = createSelector(
  [selectStudentCourses],
  studentCourses => studentCourses.studentCourses
);

export const selectedCourseDetails = createSelector(
  [selectStudentCourses],
  studentCourses => studentCourses.courseDetails
);
