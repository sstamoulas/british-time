import { createSelector } from 'reselect';

const selectInstructor = state => state.instructor;

export const instructorDetails = createSelector(
  [selectInstructor],
  instructor => instructor.instructorDetails
);
