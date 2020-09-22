import UIActionTypes from './ui.types';

const INITIAL_STATE = {
  actions: [],
}

const uiReducer = (state = INITIAL_STATE, { type, payload }) => {
  const { actions } = state;

  switch(type) {
    case UIActionTypes.UI_ACTION_START:
      return {
        ...state,
        actions: [...actions, payload.action],
      };
    case UIActionTypes.UI_ACTION_STOP:
      return {
        ...state,
        actions: actions.filter((action) => action !== payload.action),
      };
    default:
      return state;
  }
}

export default uiReducer;
