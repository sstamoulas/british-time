import { createSelector } from 'reselect';

const selectSystem = state => state.system;

export const selectUsers = createSelector(
  [selectSystem],
  users => users.users
);

export const selectUsersForManaging = createSelector(
  [selectUsers],
  users => 
    users ? Object.keys(users).map(key => users[key]) : []
);

export const selectUsersError = createSelector(
  [selectSystem],
  users => users.error
);
