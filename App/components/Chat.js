import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
  TextInput,
  Button,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  AsyncStorage,
} from 'react-native';
import propTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import MessagesList from './MessagesList';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this.onMessageInputChange = this.onMessageInputChange.bind(this);
    this.onSubmitButtonPress = this.onSubmitButtonPress.bind(this);
    this.onPickButtonPress = this.onPickButtonPress.bind(this);
  }

  componentDidMount() {
    this.props.socketConnection.emit('switchRoom', this.props.conversationToRender._id);
  }

  onMessageInputChange(text) {
    this.setState({ text });
  }

  onPickButtonPress() {
    AsyncStorage.multiGet(['avatar', 'username'], (err, result) => {
      const adminObj = {
        avatar: result[0][1],
        username: result[1][1],
      };
      this.props.socketConnection.emit('conversationPicked', adminObj);
    });
    fetch(`/api/conversations/pick`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ id: this.props.conversationToRender._id }),
    })
      .catch(err => console.log(err));
  }

  onSubmitButtonPress() {
    const message = this.state.text;
    if (message === '') return;
    const messageObj = {
      conversationId: this.props.conversationToRender._id,
      body: message,
      createdAt: Date.now(),
      author: {
        item: this.props.adminId,
        userType: 'Admin',
      },
      isReceived: false,
    };
    this.setState({ text: '' });
    this.props.socketConnection.emit('newMessage', messageObj);
  }

  render() {
    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    const user = this.props.conversationToRender ?
      this.props.conversationToRender.participants.find(participant => participant.userType === 'User') :
      null;
    const avatar = user && (user.user.avatar === 'http://localhost:3001/uploads/avatars/avatar.png' ?
      'http://10.0.2.2:3001/uploads/avatars/avatar.png' :
      user.user.avatar);
    const userName = user && user.user.username;
    return (
      <View style={styles.container}>
        <View style={styles.conversationHeader}>
          <TouchableHighlight style={styles.backButton} onPress={() => Actions.pop()} activeOpacity={5}>
            <Image
              source={{ uri: 'http://10.0.2.2:3001/resources/widget/images/back.png' }}
              style={styles.backButtonImage}
            />
          </TouchableHighlight>
          <Image source={{ uri: avatar }} style={styles.headerAvatar} />
          <Text style={styles.username}>{userName}</Text>
          {this.props.isConversationPicked ?
            <Text style={styles.pickButton}>Picked</Text> :
            <Touchable onPress={this.onPickButtonPress}>
              <View style={styles.pickButton}>
                <Text style={styles.pickButtonText}>Pick</Text>
              </View>
            </Touchable>
          }
        </View>
        <MessagesList messages={this.props.conversationToRender.messages} />
        <View style={styles.form}>
          <TextInput
            style={styles.messageInput}
            value={this.state.text}
            onChangeText={this.onMessageInputChange}
          />
          <Button
            style={styles.submitButton}
            onPress={this.onSubmitButtonPress}
            title="Submit"
            color="#c0233d"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  conversationHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#c0233d',
    flexDirection: 'row',
  },
  backButton: {
    position: 'absolute',
    left: 15,
  },
  backButtonImage: {
    backgroundColor: '#c0233d',
    width: 30,
    height: 30,
  },
  headerAvatar: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  username: {
    color: 'white',
    fontSize: 16,
  },
  form: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
  },
  messageInput: {
    flex: 10,
  },
  pickButton: {
    position: 'absolute',
    right: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#8f1b31',
  },
  pickButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

Chat.propTypes = {
  conversationToRender: propTypes.shape({
    _id: propTypes.string,
    participants: propTypes.arrayOf(propTypes.shape({
      userType: propTypes.string,
      user: propTypes.any,
    })),
    messages: propTypes.arrayOf(propTypes.object),
    open: propTypes.bool,
    createdAt: propTypes.oneOfType([propTypes.number, propTypes.string]),
  }),
  socketConnection: propTypes.object,
  adminId: propTypes.string,
  isConversationPicked: propTypes.bool,
};

export default Chat;
