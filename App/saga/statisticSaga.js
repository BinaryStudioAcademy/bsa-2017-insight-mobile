import { takeEvery, put } from 'redux-saga/effects';

const fetchAPI = {
  getStatisticById: (id) => {
    return fetch(`${global.insightHost}/api/statistics/by-user/${id}`)
      .then(response => {
        if (response.status === 200) return response.json()
      })
      .then(statistic => statistic);
  }
};

function* fetchStatistic(action) {
  const result = yield fetchAPI.getStatisticById(action.payload.id);
  yield put({ type: 'GET_STATISTIC_BY_ID_SUCCESS', payload: result });
}

function* statisticSaga() {
  yield takeEvery('GET_STATISTIC_BY_ID', fetchStatistic);
}

export default statisticSaga;
