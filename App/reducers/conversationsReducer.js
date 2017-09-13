const initialState = {
  allConversations: [],
};

const conversationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CONVERSATIONS_SUCCESS':
      return { ...state, allConversations: action.payload };
    default: {
      return state;
    }
  }
};

export default conversationsReducer;
