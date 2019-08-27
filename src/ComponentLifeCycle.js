import React, { Component } from 'react'


class Header extends Component {

  // 组件从页面中删除时，调用该生命周期方法
  componentWillUnmount() {
    console.log('Header 组件从页面删除之前，React 会调用 componentWillUnmount')
  }

  render() {
    console.log('Header 子组件 render')
    return <h1>React Component LifeCycle，该标题可以隐藏</h1>
  }
}


export default class extends Component {
  constructor () {
    super()
    this.state = {
      isShowHeader: true
    }
    console.log('父组件 construct')
  }

  handleShowOrHide = () => {
    this.setState({ isShowHeader: !this.state.isShowHeader })
  }

  UNSAFE_componentWillMount () {
    console.log('父组件 component will mount')
  }

  render () {
    console.log('父组件 render')
    return <>
      {/*
        第一次点击按钮后，先调用父组件 render()，因为子组件隐藏，所以再调用子组件的 componentWillUnmount()。
        再次点击按钮后，先调用父组件 render()，因为子组件可见，所以再调用子组件的 render()。
      */}
      <button onClick={this.handleShowOrHide}>
        显示或隐藏标题
      </button>
      {/*
        state.isShowHeader 为 true 时把 Header 插入页面，false 时从页面上删除 Header
      */}
      {this.state.isShowHeader ? <Header /> : null}
    </>
  }

  componentDidMount () {
    console.log('挂载时，React 会在 render() 把 DOM 元素插入页面后，再调用子组件 Header 的 componentDidMount')
  }

}

