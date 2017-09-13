import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: '',
      username: '',
      password: '',
    };
    this.onTextInputChange = this.onTextInputChange.bind(this);
    this.onLoginButtonPress = this.onLoginButtonPress.bind(this);
  }

  onTextInputChange(prop, text) {
    this.setState({ [prop]: text });
  }

  onLoginButtonPress() {
    const loginData = {
      username: this.state.username,
      password: this.state.password,
    };

    if (!loginData.username || !loginData.password) {
      this.setState({
        info: 'Enter your username/password',
      });
      return;
    }

    fetch('http://10.0.2.2:3000/api/admin/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(loginData),
      credentials: 'include',
    })
      .then(response => response.json())
      .then((data) => {
        if (data.text) {
          this.setState({ info: data.text });
        } else {
          const obj = {
            appId: data.appId,
            adminId: data._id,
          };
          const arrToStore = Object.entries(obj);
          AsyncStorage.multiSet(arrToStore, (err) => {
            console.log(err);
          })
            .then(() => {
              Actions['conversations-list']();
            });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <Text style={styles.label}>Username: </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.onTextInputChange('username', text)}
            value={this.state.username}
          />
        </View>
        <View style={styles.input}>
          <Text style={styles.label}>Password: </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.onTextInputChange('password', text)}
            value={this.state.password}
            secureTextEntry
          />
        </View>
        <Touchable onPress={this.onLoginButtonPress}>
          <View style={styles.buttonStyles}>
            <Text style={styles.buttonTextStyles}>Sign in</Text>
          </View>
        </Touchable>
        <Text style={styles.info}>{this.state.info}</Text>
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
  },
  loginButton: {
    marginTop: 20,
  },
  buttonStyles: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 15,
    borderRadius: 10,
    backgroundColor: '#c0233d',
  },
  buttonTextStyles: {
    color: '#ffffff',
  },
  info: {
    height: 20,
    top: 10,
    color: 'red',
  },
});

export default Login;
