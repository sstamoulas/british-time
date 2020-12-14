import { createSelector } from 'reselect';

const selectInstructorLessons = state => state.instructorLessons;

export const selectLessons = createSelector(
  [selectInstructorLessons],
  instructorLessons => instructorLessons.instructorLessons
);

export const instructorLessons = createSelector(
  [selectLessons],
  instructorLessons => instructorLessons ? Object.keys(instructorLessons).map(key => instructorLessons[key]) : []
);

export const selectedLessonDetails = createSelector(
  [selectInstructorLessons],
  instructorLessons => instructorLessons.lessonDetails
);
