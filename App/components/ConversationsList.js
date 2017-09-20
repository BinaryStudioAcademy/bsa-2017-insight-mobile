import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { getAllConversations } from './../actions/conversationsActions';
import { findItemById, startSocketConnection } from './../startSocketConnections';
import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';

class ConversationsList extends Component {
  constructor(props) {
    super(props);
    this.onConversationPress = this.onConversationPress.bind(this);
    this.onLogoutButtonPress = this.onLogoutButtonPress.bind(this);
  }

  componentDidMount() {
    this.props.getAllConversations();
    startSocketConnection.call(this, this.props.dispatch);
  }

  onLogoutButtonPress() {
    AsyncStorage.clear(err => console.log(err));
    fetch(`${global.insightHost}/api/admin/logout`, { credentials: 'include' })
      .then(() => Actions.login())
      .catch(err => console.log(err));
  }

  onConversationPress(conversationToRender) {
    const isConversationPicked = (conversationToRender.participants.filter(partic => partic.userType === 'Admin')).length > 0;
    Actions.chat({
      conversationToRender,
      socketConnection: this.socket,
      adminId: this.adminId,
      isConversationPicked,
      dispatch: this.props.dispatch,
      conversations: this.props.conversations,
    });
  }

  render() {
    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    return (
      <View style={styles.container}>
        <StatusBarPaddingIOS />
        <View style={styles.header}>
          <Text style={styles.title}>Conversation list</Text>
          <Touchable onPress={this.onLogoutButtonPress}>
            <View style={styles.logoutButton}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </View>
          </Touchable>
        </View>
        <FlatList
          keyExtractor={item => item._id}
          data={this.props.conversations}
          renderItem={(item) => {
            const conversation = item.item;
            const lastMessage = conversation.messages[conversation.messages.length - 1];
            const lastMessageDate = lastMessage && new Date(lastMessage.createdAt);
            let passedTime = lastMessage && (`${((Date.now() - lastMessageDate.valueOf()) / 60000).toFixed()}m ago`);
            if (parseInt(passedTime, 10) > 60) {
              passedTime = `${Math.round(parseInt(passedTime, 10) / 60)}h ago`;
              if (parseInt(passedTime, 10) > 24) passedTime = `${Math.round(parseInt(passedTime, 10) / 24)}d ago`;
            }
            if (lastMessage && lastMessage.author.item) {
              const avatar = lastMessage
              && ((lastMessage.author.item.avatar === 'avatar.png' || lastMessage.author.item.avatar === 'http://localhost:3001/uploads/avatars/avatar.png')
              ? `${global.insightHost}/uploads/avatars/avatar.png`
              : lastMessage.author.item.avatar);
              return (
                <TouchableHighlight onPress={() => this.onConversationPress(conversation)}>
                  <View style={styles.conversation}>
                    <Image source={{ uri: avatar }} style={styles.avatar} />
                    <View style={styles.authorNameWrapper}>
                      <Text style={styles.authorName}>{lastMessage.author.item.username}</Text>
                      <Text style={styles.messageTime}>{passedTime}</Text>
                      <Text style={styles.message} numberOfLines={1}>
                        {typeof lastMessage.body === 'object' ?
                          `${lastMessage.body.fileName}.${lastMessage.body.fileType}` :
                          lastMessage.body}
                      </Text>
                    </View>
                  </View>
                </TouchableHighlight>);
            }
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#c0233d',
    flexDirection: 'row',
  },
  title: {
    marginLeft: 30,
    color: '#ffffff',
    fontSize: 18,
  },
  logoutButton: {
    // position: 'absolute',
    // right: 10,
    // top: 0,
    // marginVertical: 0,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#8f1b31',
  },
  logoutButtonText: {
    fontSize: 18,
    color: '#ffffff',
  },
  conversation: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  authorNameWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  authorName: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#666',
  },
  message: {
    position: 'absolute',
    width: 300,
    bottom: 0,
    fontSize: 16,
  },
});

ConversationsList.propTypes = {
  dispatch: propTypes.func,
  getAllConversations: propTypes.func,
  conversations: propTypes.arrayOf(propTypes.shape({
    _id: propTypes.string.isRequired,
    participants: propTypes.arrayOf(propTypes.shape({
      userType: propTypes.string,
      user: propTypes.any,
    })),
    messages: propTypes.arrayOf(propTypes.any),
    open: propTypes.bool,
    createdAt: propTypes.oneOfType([propTypes.number, propTypes.string]),
  })),
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllConversations: () => {
      return dispatch(getAllConversations());
    },
    dispatch,
  };
};
const mapStateToProps = state => ({
  conversations: state.conversations.conversations,
});

export default connect(mapStateToProps, mapDispatchToProps)(ConversationsList);

