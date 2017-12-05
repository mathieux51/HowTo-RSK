import { GIFS } from '../constants';

export default function gifs(state = [], action) {
  switch (action.type) {
    case GIFS:
      return [...action.field];
    default:
      return state;
  }
}
