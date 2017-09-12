import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import ChatList from './components/ConversationsList';
import Chat from './components/Chat';

const App = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="conversations-list" component={ChatList} title="Conversations List" initial/>
        <Scene key="chat" component={Chat} title="Insight Chat"/>
      </Scene>
    </Router>
  );
};

export default App;