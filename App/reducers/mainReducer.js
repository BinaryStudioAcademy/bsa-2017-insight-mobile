import { combineReducers } from 'redux';
import conversationsReducer from './conversationsReducer';
import statisticReducer from './statisticReducer';

export default combineReducers({
  conversations: conversationsReducer,
  statistics: statisticReducer,
});
