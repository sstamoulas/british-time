import UIActionTypes from './ui.types';

export const actionStart = (action) => ({
  type: UIActionTypes.UI_ACTION_START,
  payload: { action },
});

export const actionStop = (action) => ({
  type: UIActionTypes.UI_ACTION_STOP,
  payload: { action },
});

export const subActionStart = (action) => ({
  type: UIActionTypes.UI_SUB_ACTION_START,
  payload: { action },
})

export const subActionStop = (action) => ({
  type: UIActionTypes.UI_SUB_ACTION_STOP,
  payload: { action },
})
