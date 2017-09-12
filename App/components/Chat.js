import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
  TextInput,
  Button,
  Dimensions,
} from 'react-native';
import propTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import MessagesList from './MessagesList';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Type message here...',
    };
    this.onMessageInputChange = this.onMessageInputChange.bind(this);
    this.onSubmitButtonPress = this.onSubmitButtonPress.bind(this);
  }

  onMessageInputChange(e) {
    this.setState({ text: e.target.value });
  }

  onSubmitButtonPress() {
    console.log('yeeeah');
  }

  render() {
    const user = this.props.conversationToRender ?
      this.props.conversationToRender.participants.find(participant => participant.userType === 'User') :
      null;
    const avatar = user && (user.user.avatar === 'avatar.png' ?
      'https://www.materialist.com/static/new_store/images/avatar_placeholder.svg' :
      user.user.avatar);
    const userName = user && user.user.username;
    return (
      <View style={styles.container}>
        <View style={styles.conversationHeader}>
          <TouchableHighlight style={styles.backButton} onPress={() => Actions.pop()} activeOpacity={5}>
            <Image
              source={{ uri: 'http://10.0.2.2:3000/resources/widget/images/back.png' }}
              style={styles.backButtonImage}
            />
          </TouchableHighlight>
          <Image source={{ uri: avatar }} style={styles.headerAvatar} />
          <Text style={styles.username}>{userName}</Text>
        </View>
        <MessagesList messages={this.props.conversationToRender.messages} />
        <View style={styles.form}>
          <TextInput
            style={styles.messageInput}
            value={this.state.text}
            onChange={this.onMessageInputChange}
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
};

export default Chat;