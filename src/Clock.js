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

  componentDidMount () {
    // 每隔 1 秒更新时钟的 state.date，这样页面就可以动起来了
    this.timer = setInterval(() => {
      this.setState({ date: new Date().toLocaleString('zh-CN') })
    }, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render () {
    return <>
      <button onClick={this.handleShowOrHide}>
        显示或隐藏时钟
      </button>
      {this.state.isShowClock ? <Dater date={this.state.date}/> : null }
    </>
  }
}

