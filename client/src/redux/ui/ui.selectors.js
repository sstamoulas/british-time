import { createSelector } from 'reselect';

const selectUI = state => state.ui;

export const isLoading = createSelector(
  [selectUI],
  ui => !!ui.actions.length
);

export const isSubLoading = createSelector(
  [selectUI],
  ui => !!ui.subActions.length
);
