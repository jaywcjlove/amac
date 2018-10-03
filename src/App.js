/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  MenuManager,
  AlertIOS,
  Linking,
  Text,
  View
} from 'react-native';
import { NativeRouter, Route, Link, withRouter, Switch } from 'react-router-native';
import { Provider } from 'react-redux';
import { init } from '@rematch/core';
import { getRouterData } from './common/router';
import * as models from './models/global';

const store = init({
  models
});

type Props = {};

export default class App extends Component<Props> {
  componentDidMount() {
    MenuManager.addSubmenu('help', [
      {
        title: 'Official Website',
        key: 'w',
        callback: () => Linking.openURL('https://jaywcjlove.github.io/awesome-mac/'),
      }, {
        title: 'Open Source',
        key: 'o',
        callback: () => Linking.openURL('https://github.com/jaywcjlove/amac'),
      }, {
        title: 'Awesome Mac',
        key: 'a',
        callback: () => Linking.openURL('https://github.com/jaywcjlove/awesome-mac'),
      }
    ]);
  }
  render() {
    return (
      <Provider store={store}>
        <NativeRouter>
          <RoutersContainer />
        </NativeRouter>
      </Provider>
    );
  }
}

const RoutersContainer = withRouter(({ history: historyData, location }) => {
  const routerData = getRouterData();
  const BasicLayout = routerData['/'].component;
  const resetProps = {
    routerData,
    location,
    history: historyData,
  };

  return (
    <View style={styles.container}>
      <Switch >
        <Route path="/" render={props => <BasicLayout {...props} {...resetProps} />} />
      </Switch>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
