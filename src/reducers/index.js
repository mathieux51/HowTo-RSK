import { combineReducers } from 'redux';
import userJwt from './userJwt';
import userProfile from './userProfile';
import runtime from './runtime';

export default combineReducers({
  userJwt,
  userProfile,
  runtime,
});
