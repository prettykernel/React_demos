import React, { Component } from 'react'


class Clock extends Component {
  timer = null

  state = {
    date: new Date().toLocaleString('zh-CN'),
  }

  // 一些组件启动的动作，例如 Ajax 请求、定时器启动等，可以在 componentDidMount 里进行。
  // 有些组件的启动工作依赖 DOM ，例如动画的启动，而 constructor 时组件还没挂载完成，所以没法进行这些启动工作，
  // 可以把这些操作放在 componentDidMount 中。
  componentDidMount () {
    // 每隔 1 秒更新时钟的 state.date
    // new Date() 返回一个对象，必须转为字符串，否则 JSX 无法正常渲染
    this.timer = setInterval(() => {
      console.log('重新注册定时器')
      this.setState({ date: new Date().toLocaleString('zh-CN') })
    }, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render () {
    return <div>{this.state.date}</div>
  }
}


export default class ClockViewer extends Component {
  state = {
    isShowClock: true,
  }

  handleShowOrHide = () => {
    this.setState({ isShowClock: !this.state.isShowClock })
  }

  render () {
    return <>
      <button onClick={this.handleShowOrHide}>
        显示或隐藏时钟
      </button>
      {/*
        组件隐藏或销毁时，在 componentWillUnmount 中清除定时器。
        如果不清除定时器，回调函数还在不断地尝试每秒 setState，而 setState 只能在已挂载或正在挂载的组件上调用，所以 React 报错。
        多次隐藏和显示，会让 React 重新构造和销毁 Clock 组件，每次构造都会重新创建一个定时器，而销毁组件时没有清除定时器，
        所以会导致内存泄漏，而且控制台输出 ‘重新注册定时器’ 的速度越来越快。
        Warning: Can't perform a React state update on an unmounted component.
        This is a no-op, but it indicates a memory leak in your application.
        To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
        in Clock (at Clock.js:51)
      */}
      {this.state.isShowClock ? <Clock /> : null }
    </>
  }
}


