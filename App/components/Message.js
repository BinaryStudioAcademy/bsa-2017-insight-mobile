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
  const messageAlign = type === 'Admin' ? 'flex-end' : 'flex-start';
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
    <View style={{ ...styles.container, alignSelf: messageAlign }}>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.author}>{name}</Text>
    </View>
  );
};

const styles = {
  container: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#aaa',
    marginTop: 10,
  },
  message: {
    width: '100%',
    fontSize: 16,
  },
  author: {
    width: '100%',
    marginTop: 4,
    fontStyle: 'italic',
    color: '#fff',
  },
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

