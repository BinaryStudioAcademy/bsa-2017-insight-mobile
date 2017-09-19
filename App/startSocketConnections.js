import io from 'socket.io-client/dist/socket.io';
import { AsyncStorage } from 'react-native';
import { fetchMessage } from './actions/conversationsActions';
import { EventRegister } from 'react-native-event-listeners';

export function findItemById(id, arrOfObjects) {
  if (!id || !arrOfObjects) return null;
  const item = arrOfObjects.find((obj) => {
    return obj._id === id;
  });
  const index = arrOfObjects.findIndex((obj) => {
    return obj._id === id;
  });
  return {
    item,
    index,
  };
}

export function startSocketConnection(dispatch) {
  this.socket = io(global.insightHost);
  AsyncStorage.getItem('adminId', (err, id) => {
    if (err) {
      console.log(err);
      return;
    }
    this.adminId = id;
    const userObj = {
      type: 'Admin',
      id,
    };
    this.socket.emit('userId', userObj);
  });

  this.socket.on('unreadNewMessage', (message) => {
    dispatch(fetchMessage(message));
    EventRegister.emitEvent('newMessage');
  });

  this.socket.on('newMessage', (message) => {
    if (message.author.userType === 'User') {
      const messageCopy = { ...message };
      messageCopy.isReceived = true;
      this.socket.emit('newMessageReceived', { type: 'Admin', id: message._id });
      dispatch(fetchMessage(messageCopy));
    } else {
      dispatch(fetchMessage(message));
    }
    EventRegister.emitEvent('newMessage');
  });

  this.socket.on('newConversationCreated', () => {
    this.props.getAllConversations();
  });
}

export default startSocketConnection;