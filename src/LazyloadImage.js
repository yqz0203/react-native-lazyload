/**
 * an implement for Image lazyload
 */

import React, { Component } from 'react'
import { View, Image, Animated, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import lazyloadComponent from './lazyloadComponent'

const LazyLoadView = lazyloadComponent(View)

export default class LazyloadImage extends Component {
  static defaultProps = {
    placeholder: require('./placeholder.png')
  }

  state = {
    aniValue: new Animated.Value(0)
  }

  enterred = false

  handleOnLoad = () => {
    Animated.timing(this.state.aniValue, {
      toValue: 1,
      duration: 300
    }).start()
  }

  renderSourceImage(inViewPort) {
    const { source } = this.props
    const { aniValue } = this.state
    if (!inViewPort && !this.enterred) {
      return null
    } else {
      this.enterred = true
      return <Animated.Image
        source={source}
        onLoad={this.handleOnLoad}
        style={[{ opacity: aniValue }, styles.source]}
      />
    }
  }
  render() {
    const { style, placeholder } = this.props
    return (
      <LazyLoadView style={[styles.container, style]}>
        {
          (inViewPort) => {
            return (
              <View style={{ flex: 1 }}>
                <Image style={styles.placeholder} source={placeholder} />
                {this.renderSourceImage(inViewPort)}
              </View>
            )
          }
        }
      </LazyLoadView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  placeholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%'
  },
  source: {
    height: '100%',
    width: '100%'
  }
})