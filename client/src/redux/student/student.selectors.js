import { createSelector } from 'reselect';

const selectStudent = state => state.student;

export const studentDetails = createSelector(
  [selectStudent],
  student => student.studentDetails
);
