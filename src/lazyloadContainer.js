/**
 * high order component to wrap a scrollable component(eg. ScrollView ListView) 
 * for getting the ability to communicate with children lazyloadComponent 
 */

import react, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import MessagerStore from './messagerStore'

// unique
let count = 0

export const lazyloadContainer = (Comp) => {
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
      if (!this.layout) return
      MessagerStore.trigger(this.lazyloadId, this.layout, nativeEvent.contentOffset)
    }

    rootRef = (e) => {
      this.rootRef = e
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
      return (
        <View style={{ flex: 1 }} ref={this.rootRef}>
          <Comp {...this.props} onLayout={this.handleLayout} onScroll={this.handleScroll} />
        </View>
      )
    }
  }
}