import React from 'react';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage, Text } from 'react-native';

class SplashScreen extends React.Component {
  componentDidMount() {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        if (stores.length > 0) {
          Actions['conversations-list']();
        } else {
          Actions.login();
        }
      });
    });
  }

  render() {
    return (
      <Text>WHAT's GOING ON</Text>
    );
  }
}


export default SplashScreen;
