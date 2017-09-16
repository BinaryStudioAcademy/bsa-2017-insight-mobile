const initialState = {
  conversations: [],
};

function findConversationById(id, conversations) {
  if (!id || !conversations) return null;
  const conversationItem = conversations.find((conversation) => {
    return conversation._id === id;
  });
  const index = conversations.findIndex((conv) => {
    return conv._id === id;
  });
  return {
    conversationItem,
    index,
  };
}

const conversationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CONVERSATIONS_SUCCESS':
      return { ...state, conversations: action.payload };
    case 'MESSAGE_FETCH_SUCCESS': {
      const oldStateConversations = [...state.conversations];
      const { index, conversationItem } = findConversationById(action.payload.conversationId, oldStateConversations);
      conversationItem.messages = [...conversationItem.messages, action.payload];
      oldStateConversations.splice(index, 1, conversationItem);
      const newConversations = [...oldStateConversations];
      console.log('in reducer new convs:', newConversations);
      return { ...state, conversations: newConversations };
    }
    default: {
      return state;
    }
  }
};

export default conversationsReducer;
