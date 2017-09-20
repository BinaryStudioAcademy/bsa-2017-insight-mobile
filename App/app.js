import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { StyleSheet, AsyncStorage, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { store, sagaMiddleware } from './store';
import rootSaga from './saga/rootSaga';
import ConversationsList from './components/ConversationsList';
import Chat from './components/Chat';
import Login from './components/Login';
import SplashScreen from './components/SplashScreen';
import Orientation from 'react-native-orientation-locker';

sagaMiddleware.run(rootSaga);

global.insightHost = Platform.OS === 'android' ? 'http://10.0.2.2:3001' : 'http://localhost:3001';

const App = () => {
  Orientation.lockToPortrait();
  return (
    <Provider store={store}>
      <Router>
        <Scene key="root">
          <Scene key="splash-screen" component={SplashScreen} hideNavBar initial />
          <Scene key="login"
            component={Login}
            title="Login Page"
            hideNavBar
            panHandlers={null}
          />
          <Scene
            key="conversations-list"
            component={ConversationsList}
            title="Conversations List"
            hideNavBar
            panHandlers={null}
          />
          <Scene
            key="chat"
            component={Chat}
            title="Insight Chat"
            hideNavBar />
        </Scene>
      </Router>
    </Provider>
  );
};

export default App;
