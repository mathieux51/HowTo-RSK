import { HISTORY_PUSH } from '../constants';

export default function history(state = {}, action) {
  switch (action.type) {
    case HISTORY_PUSH:
      return {
        ...state,
        ...action.history,
      };
    default:
      return state;
  }
}
