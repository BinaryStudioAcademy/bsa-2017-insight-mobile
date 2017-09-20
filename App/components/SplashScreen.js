import React from 'react';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage, View, Text, StyleSheet } from 'react-native';

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
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>&nbsp;&nbsp;InSight&nbsp;&nbsp;</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  logo: {
    fontSize: 30,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#de3f28',
  }
});

export default SplashScreen;
