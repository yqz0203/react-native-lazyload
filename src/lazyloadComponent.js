/**
 * high order component to wrap a any type component(eg. View Image) 
 * for getting the ability to communicate with parent lazyloadContaienr
 *
 * the component's function children will recieve a state to 
 * indicate that whether it is in the viewport, so we can do what we want
 */

import react, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

const defaultConfig = {
  threshold: 50
}

export const lazyloadComponent = (Comp, _conifg) => {
  const config = {
    ...defaultConfig,
    ..._config
  }
  return class extends Component {
    static contextTypes = {
      lazyContainerId: PropTypes.string,
    }

    static defaultProps = {
      children: () => { }
    }

    static propTypes = {
      children: PropTypes.func.isRequired
    }

    state = {
      inViewPort: false
    }

    lazyContainerId = this.context.lazyContainerId

    handleLayout = () => {
      const { handleLayout } = this.props
      handleLayout && handleLayout(e)
      if (this.measured) return
      this.compRef.measure(this.measure)
      this.measured = true
    }

    measure = (x, y, width, height, pageX, pageY) => {
      this.layout = {
        width,
        height,
        pageX,
        pageY
      }
    }

    handleScroll = (pLayout, scroll) => {
      // maybe the layout event has not triggered
      if (!this.layout) return
      const { threshold } = config
      const { inViewPort } = this.state
      const pageOffsetY = this.layout.pageY - pLayout.pageY - scroll.y,
        pageOffsetX = this.layout.pageX - pLayout.pageX - scroll.x
      if (pageOffsetY >= -this.layout.height - threshold
        && pageOffsetY <= pLayout.height + threshold
        && pageOffsetX >= -this.layout.width - threshold
        && pageOffsetX <= pLayout.width + threshold) {
        !inViewPort && this.setState({ inViewPort: true })
      } else {
        inViewPort && this.setState({ inViewPort: false })
      }
    }

    ref = (e) => {
      const { ref } = this.props
      this.compRef = e
      ref && ref(e)
    }

    componentDidMount() {
      // first bind hanlder, ensure that the first scroller trigger event can be caught
      MessagerStore.bind(this.lazyContainerId, this.handleScroll)
    }

    componentWillUnmount() {
      MessagerStore.unbind(this.lazyContainerId, this.handleScroll)
    }

    render() {
      const { children, ...rest } = this.props
      const { inViewPort } = this.state
      return (
        <Comp {...rest} onLayout={this.handleLayout} ref={this.ref} >
          {children(inViewPort)}
        </Comp>
      )
    }
  }
}
