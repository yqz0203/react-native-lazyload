/**
 * high order component to wrap a scrollable component(eg. ScrollView ListView) 
 * for getting the ability to communicate with children lazyloadComponent 
 */

import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import MessagerStore from './MessagerStore'

// unique
let count = 0

export default lazyloadContainer = (Comp) => {
  return class extends Component {
    static childContextTypes = {
      lazyContainerId: PropTypes.string,
    }

    // unique id for each container
    lazyloadId = `lazyload-${count++}`

    getChildContext() {
      return {
        lazyContainerId: this.lazyloadId
      }
    }

    handleScroll = ({ nativeEvent }) => {
      MessagerStore.setScroll(this.lazyloadId, nativeEvent.contentOffset)
      if (!this.layout) return
      MessagerStore.trigger(this.lazyloadId, this.layout, nativeEvent.contentOffset)
    }

    rootRef = (e) => {
      if (e) {
        this.rootRef = e
      }
    }

    handleLayout = () => {
      const { handleLayout } = this.props
      handleLayout && handleLayout(e)
      // only measure once
      if (this.measured) return
      this.rootRef.measure((x, y, width, height, pageX, pageY) => {
        this.layout = {
          width,
          height,
          pageX,
          pageY
        }
        // FIXME: how to know all the children has layouted 
        setTimeout(() => {
          MessagerStore.trigger(this.lazyloadId, this.layout, { x: 0, y: 0 })
        }, 17)
      })
      this.measured = true
    }

    componentWillUnmount() {
      MessagerStore.removeStore(this.lazyloadId)
    }

    render() {
      const { wrapperStyle } = this.props
      return (
        <View style={[{ flex: 1 }, wrapperStyle]} ref={this.rootRef} collapsable={false}>
          <Comp {...this.props} onLayout={this.handleLayout} onScroll={this.handleScroll} />
        </View>
      )
    }
  }
}
