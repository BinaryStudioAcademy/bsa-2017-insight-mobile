import { put, takeEvery } from 'redux-saga/effects';

function* getConversationsSaga() {
  const result = yield fetch('http://10.0.2.2:3001/api/conversations', {credentials: 'include' })
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(err));
  yield put({ type: 'GET_CONVERSATIONS_SUCCESS', payload: result });
}

function* watchConversations() {
  yield takeEvery('GET_ALL_CONVERSATIONS', getConversationsSaga);
}

export default watchConversations;
