import { createSelector } from 'reselect';

const selectCourse = state => state.course;

export const selectCourses = createSelector(
  [selectCourse],
  course => course.courses
);

export const selectCoursesForManaging = createSelector(
  [selectCourses],
  courses =>
    courses ? Object.keys(courses).map(key => courses[key]) : []
);

export const selectCurrentCourse = createSelector(
  [selectCourse],
  course => course.currentCourse
);
