import { combineReducers } from 'redux';
import conversationsReducer from './conversationsReducer';

export default combineReducers({
  conversations: conversationsReducer,
});
