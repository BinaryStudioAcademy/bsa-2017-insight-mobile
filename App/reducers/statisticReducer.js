const initialState = {
  statisticById: null,
};

const statisticReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_STATISTIC_BY_ID_SUCCESS':
      return Object.assign({}, state, { userStatistics: action.payload });
    default:
      return state;
  }
};

export default statisticReducer;
