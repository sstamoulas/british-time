import UIActionTypes from './ui.types';

const INITIAL_STATE = {
  actions: [],
  subActions: [],
};

const uiReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch(type) {
    case UIActionTypes.UI_ACTION_START:
      return {
        ...state,
        actions: [...state.actions, payload.action],
      };
    case UIActionTypes.UI_ACTION_STOP:
      return {
        ...state,
        actions: state.actions.filter((action) => action !== payload.action),
      };
    case UIActionTypes.UI_SUB_ACTION_START:
      return {
        ...state,
        subActions: [...state.subActions, payload.action],
      };
    case UIActionTypes.UI_SUB_ACTION_STOP:
      return {
        ...state,
        subActions: state.subActions.filter((subAction) => subAction !== payload.action),
      };
    default:
      return state;
  }
}

export default uiReducer;
