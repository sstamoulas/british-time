import { createSelector } from 'reselect';

const selectInstructorCourses = state => state.instructorCourses;

export const instructorCourses = createSelector(
  [selectInstructorCourses],
  instructorCourses => instructorCourses.instructorCourses
);

export const instructors = createSelector(
  [selectInstructorCourses],
  instructorCourses => instructorCourses.instructors
);

export const selectInstructorCoursesForManaging = createSelector(
  [instructorCourses],
  courses =>
    courses ? Object.entries(courses).map(([index, instructorCourse]) => instructorCourse) : []
);

export const selectedCourseDetails = createSelector(
  [selectInstructorCourses],
  instructorCourses => instructorCourses.courseDetails
);

export const instructorCourse = createSelector(
  [selectInstructorCourses],
  instructorCourses => instructorCourses.instructorCourse
);
