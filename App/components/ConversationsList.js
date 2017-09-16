import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import { getAllConversations } from './../actions/conversationsActions';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import startSocketConnection from './../startSocketConnections';

class ConversationsList extends Component {
  constructor(props) {
    super(props);
    this.onConversationPress = this.onConversationPress.bind(this);
  }
  static navigationOptions = {
    headerLeft: null,
  };
  componentDidMount() {
    this.props.getAllConversations();
    startSocketConnection.call(this, this.props.dispatch);
  }

  onConversationPress(conversationToRender) {
    Actions.chat({
      conversationToRender,
      socketConnection: this.socket,
      adminId: this.adminId,
    })
  }

  render() {
    return (
      <View style={styles.container}>
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
            const avatar = lastMessage && (lastMessage.author.item.avatar === 'http://localhost:3001/uploads/avatars/avatar.png' ?
              `${global.insightHost}/uploads/avatars/avatar.png` :
              lastMessage.author.item.avatar);
            return (
              <TouchableHighlight onPress={() => this.onConversationPress(conversation)}>
                <View style={styles.conversation}>
                  <Image source={{ uri: avatar }} style={styles.avatar} />
                  <View style={styles.authorNameWrapper}>
                    <Text styles={styles.authorName}>{lastMessage.author.item.username}</Text>
                    <Text style={styles.messageTime}>{passedTime}</Text>
                    <Text style={styles.message} numberOfLines={1}>
                      {typeof lastMessage.body === 'object' ?
                        `${lastMessage.body.fileName}.${lastMessage.body.fileType}` :
                        lastMessage.body}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>);
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
  message: {
    position: 'absolute',
    width: 300,
    bottom: 0,
    fontSize: 16,
  },
});


const mapDispatchToProps = (dispatch) => {
  return {
    getAllConversations: () => {
      return dispatch(getAllConversations());
    },
    dispatch,
  }
};
const mapStateToProps = (state) => ({
  conversations: state.conversations.conversations,
});

export default connect(mapStateToProps, mapDispatchToProps)(ConversationsList);

