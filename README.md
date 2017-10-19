# rn-lazyload

react-native懒加载组件，简单易用，方便扩展。

![](https://github.com/yqz0203/rn-lazyload/blob/master/screenshots/demo.gif)

## 安装

`yarn add @yqz0203/rn-lazyload`(建议)

或者

`npm install @yqz0203/rn-lazyload`


## 使用

 ``` jsx
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

import { lazyloadComponent, lazyloadContainer, LazyloadImage } from 'rn-lazyload'

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
})
 
 ```

### layloadContainer(Component)

高阶组件，包裹一个可滚动组件（例如：ScrollView, FlatListView等）返回一个懒加载容器。

``` jsx
import {lazyloadContainer} from 'rn-lazyload'
import {ScrollView} from 'react-native'
const LazyScrollView = lazyloadContainer(ScrollView)
//....
return (
  <LazyScrollView>
    {/*...*/}
  </LazyScrollView>
)
//...

```
容器支持被包裹组件的全部`props`，且所有在`LazyScrollView`中的被`lazyloadComponent`包裹的子组件开始支持懒加载。

因为某些原因，容器的最外层加上了一个额外`<View>`组件，可以通过传入额外的`wrapperStyle`定义其样式。默认样式为`{flex:1}`。

### 支持的props

- 所有被包裹组件的全部props

- wrapperStyle

默认：`{flex:1}`

### layloadComponent(Component,config)

高阶组件，包裹一个任意组件，使其成一个支持懒加载的组件。这里需要注意的是，组件自身并不是懒加载的，而是子元素是懒加载的，目的是为了达到更细致的控制已经更好的扩展性。

>> 注意：所有懒加载组件只有在懒加载容器中才会有效果

返回的组件支持传入一个函数作为子元素，函数的参数为`boolean`类型，表示当前元素是否在视图中。通过这个状态，我们可以自行决定内容的显示或隐藏。

``` jsx
import {lazyloadComponent} from 'rn-lazyload'
import {View,Text} from 'react-native'
const LazyloadView = lazyloadContainer(View)
//....
return (
  <LazyloadView>
    {
      (inViewPort)=>{
        if(inViewPort){
          return null
        }
        return <Text>hello</Text>
      }
    }
  </LazyloadView>
)
//...

```

#### config

- threshold {number} 阈值

默认：50

#### props

所有被包裹组件的属性


>> **注意：** 被包裹组件应该有确定的高度，因为组件只会在初始化时计算自己的偏移量，也就是说如果元素在页面的位置会发生改变，内部计算的偏移量将不会更新。如果组件没有确定的高度，可能会发生奇怪的现象。


### LazyloadImage

内部实现的支持懒加载的图片组件。

#### props

- placeholder {source}

图片占位符

- source 

原图的地址

- style

这里的样式并不是图片的样式，而是包括图片的`View`的样式，图片将会填充满整个`View`。


## 例子

`git clone https://github.com/yqz0203/rn-lazyload.git`

`cd example && yarn`

`react-native run ios`

## 测试环境

react-native-cli 2.0.1
react-native@0.49.3

