import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
  Button,
  Linking,
} from 'react-native';
import propTypes from 'prop-types';

const Message = ({ name, body, type }) => {
  const messageAlign = type === 'Admin' ? 'flex-end' : 'flex-start';
  const bodyIsLink = typeof body === 'object';
  let message;
  if (bodyIsLink) {
    if (body.isImage) {
      message = <Image
        source={{ uri: body.path }}
        alt={body.fileName}
        style={{width: 150, height: 150}}
      />;
    } else {
      message = <Button
        onPress={Linking.openURL(body.path).catch(err => console.error('An error occurred', err))}
        title={`${body.fileName}.${body.fileType}`}
        />;
    }
  } else {
    message = <Text style={styles.message}>{body}</Text>;
  }
  return (
    <View style={{ ...styles.container, alignSelf: messageAlign }}>
      <View>{message}</View>
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
    // maxWidth: '80%',
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

