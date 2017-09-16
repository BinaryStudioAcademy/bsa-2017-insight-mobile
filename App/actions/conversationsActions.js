const getAllConversations = () => ({ type: 'GET_ALL_CONVERSATIONS' });

const fetchMessage = messageData => ({
  type: 'MESSAGE_FETCH_SUCCESS',
  payload: messageData,
});

export {
  getAllConversations,
  fetchMessage,
};
