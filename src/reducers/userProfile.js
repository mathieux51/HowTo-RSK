/* eslint-disable consistent-return */
import { SET_FIELD_USER_PROFILE } from '../constants/index';

export default function userProfile(state = {}, action) {
  switch (action.type) {
    case SET_FIELD_USER_PROFILE:
      return {
        ...state,
        ...action.field,
      };
    default:
      return state;
  }
}
