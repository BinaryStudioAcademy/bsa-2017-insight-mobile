import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import conversations from './conversations';

export default class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
    };
  }

  // componentDidMount() {
  //   fetch('http://10.0.2.2:3000/api/conversations', {credentials: 'include' })
  //     .then(response => response.json())
  //     .then(data => this.setState({ conversations: data }))
  //     .catch(err => console.log(err))
  // }

  render() {
    console.log(conversations);
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={item => item._id}
          data={conversations}
          renderItem={(item) => {
            const conversation = item.item;
            const lastMessage = conversation.messages[conversation.messages.length - 1];
            const lastMessageDate = lastMessage && new Date(lastMessage.createdAt);
            const passedTime = lastMessage && ((Date.now() - lastMessageDate.valueOf()) / 60000).toFixed();
            const avatar = lastMessage && (lastMessage.author.item.avatar === 'avatar.png' ?
              'https://www.materialist.com/static/new_store/images/avatar_placeholder.svg' :
              lastMessage.author.item.avatar);
            return (
              <TouchableHighlight onPress={() => Actions.chat()}>
                <View style={styles.conversation}>
                  <Image source={{ uri: avatar }} style={styles.avatar} />
                  <View style={styles.authorNameWrapper}>
                    <Text styles={styles.authorName}>{lastMessage.author.item.username}</Text>
                    <Text style={styles.messageTime}>{`${passedTime}m ago`}</Text>
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
