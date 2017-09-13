import { fork } from 'redux-saga/effects';
import conversationSaga from './conversationsSaga';


function* rootSaga() {
  yield [
    fork(conversationSaga),
  ];
}

export default rootSaga;
