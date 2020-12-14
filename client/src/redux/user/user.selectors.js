import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const currentUser = createSelector(
  [selectUser],
  user => user.currentUser
);

export const userError = createSelector(
  [selectUser],
  user => user.error
);
