/* eslint-disable consistent-return */
import { SET_FIELD_USER_ERROR_MESSAGE } from '../constants';

export default function userErrorMessages(state = {}, action) {
  switch (action.type) {
    case SET_FIELD_USER_ERROR_MESSAGE:
      return {
        ...state,
        ...action.message,
      };
    default:
      return state;
  }
}
