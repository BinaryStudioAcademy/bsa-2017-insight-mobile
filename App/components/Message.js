import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
} from 'react-native';
import propTypes from 'prop-types';

const Message = ({ name, body, type }) => {
  const messageAlign = type === 'Admin' ? 'message-item-left' : 'message-item-right';
  const bodyIsLink = typeof body === 'object';
  let message;
  if (bodyIsLink) {
    if (body.isImage) {
      message = (
        <a href={body.path} target="_blank">
          <img className={styles['message-body-image']} src={body.path} alt={body.fileName} />
        </a>);
    } else {
      message = <a href={body.path}>{body.fileName}.{body.fileType}</a>;
    }
  } else {
    message = <Text>{body}</Text>;
  }
  return (
    <View>
      <Text>{message}</Text>
      <Text>{name}</Text>
    </View>
  );
};

Message.propTypes = {
  name: propTypes.string,
  body: propTypes.oneOfType([propTypes.string, propTypes.shape({
    finalName: propTypes.string,
    fileName: propTypes.string,
    fileType: propTypes.string,
    isImage: propTypes.bool,
  })]),
  type: propTypes.string,
};

export default Message;

