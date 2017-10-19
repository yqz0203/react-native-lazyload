/**
 * ScrollView example
 */

import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import { lazyloadComponent, lazyloadContainer, LazyloadImage } from './src/index'

const LazyScrollView = lazyloadContainer(ScrollView)

const data = []
for (let i = 0; i < 20; i++) {
  data.push({ key: i })
}

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <LazyScrollView style={styles.container} scrollEventThrottle={16}>
          {data.map((item) => <LazyloadImage
            style={{ height: 200, width: 200 }}
            source={{ uri: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=792258386,3657525489&fm=27&gp=0.jpg' }}
            key={item.key} />)}
        </LazyScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
