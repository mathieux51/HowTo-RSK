import { combineReducers } from 'redux';
import userJwt from './userJwt';
import userProfile from './userProfile';
import userErrorMessages from './userErrorMessages';
import history from './history';
import gifs from './gifs';
// import runtime from './runtime';

export default combineReducers({
  userJwt,
  userProfile,
  history,
  userErrorMessages,
  gifs,
  // runtime,
});
