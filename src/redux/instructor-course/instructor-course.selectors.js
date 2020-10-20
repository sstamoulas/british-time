import { createSelector } from 'reselect';

const selectInstructorCourses = state => state.instructorCourses;

export const instructorCourses = createSelector(
  [selectInstructorCourses],
  instructorCourses => instructorCourses.instructorCourses
);

export const selectedCourseDetails = createSelector(
  [selectInstructorCourses],
  instructorCourses => instructorCourses.courseDetails
);
