/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Modal
} from 'react-native'

import ScrollViewExample from './ScrollViewExample'
import FlatListViewExample from './FlatListViewExample'

export default class App extends Component {
  state = {
    modalVisible: false,
    ExampleType: null
  }

  renderExample = () => {
    const { ExampleType } = this.state
    if (!ExampleType) return null
    return <ExampleType />
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title={'scrollview example'} onPress={() => { this.setState({ ExampleType: ScrollViewExample, modalVisible: true }) }} />
        <Button title={'flatlist example'} onPress={() => { this.setState({ ExampleType: FlatListViewExample, modalVisible: true }) }} />
        <Modal
          visible={this.state.modalVisible}
          animationType={'slide'}
          style={{ backgroundColor: '#e8e8e8' }}
        >
          {this.renderExample()}
          <Button
            title={'close'}
            onPress={() => { this.setState({ modalVisible: false }) }}
          />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#F5FCFF',
  }
});
