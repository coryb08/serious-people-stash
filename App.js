import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';
// import { AppRegistry } from "react-native";
import {composeWithDevTools} from 'redux-devtools-extension';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
// import { createStore, applyMiddleware } from 'redux'
import rootReducer from './src/store/reducers';
// import { store } from './src/store'
// import { persistStore, persistReducer } from 'redux-persist'
import ReduxThunk from 'redux-thunk';
import Router from './router.js';
// import storage from 'redux-persist/lib/storage'
const {ConnectedRouter, Scenes} = Router;
import {store} from './src/store/store.js';
// const persistConfig = {
import * as actions from './src/store/actions';
import SplashScreen from './src/components/SplashScreen';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true};
    console.disableYellowBox = true;
  }
  componentWillMount = () => {
    setTimeout(() => this.setState({loading: false}), 5000);
    StatusBar.setHidden(true);
  };
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter scenes={Scenes} />
      </Provider>
    );
  }
}
// comment here
