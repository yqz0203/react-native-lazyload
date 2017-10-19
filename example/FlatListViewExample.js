/**
 * FlatListView example
 */

import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';

import { lazyloadComponent, lazyloadContainer, LazyloadImage } from './src/index'

const LazyFlatList = lazyloadContainer(FlatList)

const page = 0

const genData = () => {
  const data = []
  for (let i = page * 20; i < 20 + page * 20; i++) {
    data.push({ key: i + page * 20 })
  }
  page++
  return data
}

export default class App extends Component {
  state = {
    data: genData()
  }

  renderItem = () => {
    return (
      <LazyloadImage
        style={{ height: 200, width: 200 }}
        source={{ uri: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=792258386,3657525489&fm=27&gp=0.jpg' }}
      />
    )
  }

  handleReachEnd = () => {
    setTimeout(() => {
      this.setState({
        data: [
          ...this.state.data,
          ...genData()
        ]
      })
    }, 1000)
  }

  render() {
    return (
      <View style={styles.container}>
        <LazyFlatList
          data={this.state.data}
          style={styles.container}
          renderItem={this.renderItem}
          onEndReached={this.handleReachEnd}
          onEndReachedThreshold={0}
        />
      </View>
    )
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
