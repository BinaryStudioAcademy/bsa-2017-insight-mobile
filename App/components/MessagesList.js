import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import propTypes from 'prop-types';
import Message from './Message';

class MessagesList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.messagesList}>
        <ScrollView
          ref={ref => this.scrollView = ref}
          onContentSizeChange={(contentWidth, contentHeight)=>{
              this.scrollView.scrollToEnd({animated: true});
          }}
        >
          {this.props.messages && this.props.messages.map((message) => {
            return (
              <Message
                key={message._id}
                body={message.body}
                name={message.author.item.firstName || message.author.item.username}
                type={message.author.userType}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  messagesList: {
    flex: 10,
    padding: 10,
    paddingRight: 12,
  },
});

MessagesList.propTypes = {
  messages: propTypes.arrayOf(propTypes.shape({
    conversationId: propTypes.string,
    body: propTypes.oneOfType([propTypes.string, propTypes.shape({
      finalName: propTypes.string,
      fileName: propTypes.string,
      fileType: propTypes.string,
      isImage: propTypes.bool,
    })]).isRequired,
    author: propTypes.shape({
      item: propTypes.any,
      userType: propTypes.string,
    }),
    createdAt: propTypes.oneOfType([propTypes.number, propTypes.string]),
    editedAt: propTypes.number,
  })),
};

export default MessagesList;
