import { createSelector } from 'reselect';

const selectSystem = state => state.system;

export const selectUsers = createSelector(
  [selectSystem],
  system => system.users
);

export const selectUsersForManaging = createSelector(
  [selectUsers],
  users => 
    users ? Object.keys(users).map(key => users[key]) : []
);

export const selectSystemError = createSelector(
  [selectSystem],
  system => system.error
);
