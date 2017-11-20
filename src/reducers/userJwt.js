import { SET_FIELD_USER_JWT } from '../constants/index';

export default function userJwt(state = {}, action) {
  switch (action.type) {
    case SET_FIELD_USER_JWT:
      return {
        ...state,
        ...action.field,
      };
    default:
      return state;
  }
}
