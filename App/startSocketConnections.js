import io from 'socket.io-client';
import { AsyncStorage } from 'react-native';
import { fetchMessage } from './actions/conversationsActions';

function startSocketConnection(dispatch) {
  this.socket = io('http://10.0.2.2:3001');
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
  });
  this.socket.on('newConversationCreated', () => {
    this.props.getAllConversations();
  });
}

export default startSocketConnection;