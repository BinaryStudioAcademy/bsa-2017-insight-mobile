import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store, sagaMiddleware } from './store';
import rootSaga from './saga/rootSaga';
import ConversationsList from './components/ConversationsList';
import Chat from './components/Chat';
import Login from './components/Login';

sagaMiddleware.run(rootSaga);

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Scene key="root">
          <Scene key="login" component={Login} title="Login Page" initial />
          <Scene
            key="conversations-list"
            component={ConversationsList}
            title="Conversations List"
            navigationBarStyle={styles.navBar}
            titleStyle={styles.navTitle}
          />
          <Scene key="chat" component={Chat} title="Insight Chat" hideNavBar />
        </Scene>
      </Router>
    </Provider>
  );
};

const styles = StyleSheet.create({
  navBar: {
    height: 70,
    backgroundColor: '#c0233d',
  },
  navTitle: {
    color: '#ffffff',
  },
});

export default App;
