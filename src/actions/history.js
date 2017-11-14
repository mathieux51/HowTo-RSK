/* eslint-disable import/prefer-default-export */
import _history from '../history';
import { HISTORY_PUSH } from '../constants';

export const historyPush = history => dispatch => {
  _history.push(history.pathname);
  dispatch({
    type: HISTORY_PUSH,
    history,
  });
};
