import { fork } from 'redux-saga/effects';
import conversationSaga from './conversationsSaga';
import statisticSaga from './statisticSaga';

function* rootSaga() {
  yield [
    fork(conversationSaga),
    fork(statisticSaga),
  ];
}

export default rootSaga;
