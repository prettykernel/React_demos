import React, { Component } from 'react'


const Dater = ({ date }) => {
  return <div>{date}</div>
}

export default class Clock extends Component {
  timer = null

  state = {
    date: new Date().toLocaleString('zh-CN'),
    isShowClock: true,
  }

  handleShowOrHide = () => {
    this.setState({ isShowClock: !this.state.isShowClock })
  }

  // 一些组件启动的动作，例如 Ajax 请求、定时器启动等，可以在 componentDidMount 里进行
  componentDidMount () {
    // 每隔 1 秒更新时钟的 state.date
    // new Date() 返回一个对象，必须转为字符串，否则 JSX 无法正常渲染
    this.timer = setInterval(() => {
      console.log(444)
      this.setState({ date: new Date().toLocaleString('zh-CN') })
    }, 1000)
  }

  componentWillUnmount () {
   // clearInterval(this.timer)
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
        所以会导致内存泄漏。
      */}
      {this.state.isShowClock ? <Dater date={this.state.date}/> : null }
    </>
  }
}

