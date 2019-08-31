import React, { Component } from 'react'


class MyButton extends Component {
  state = {
    count: 0,
  }

  handleClick = (e) => {
    this.setState({count: this.state.count + 1})
  }

  render() {
    const isGoodWord = true

    // JSX 直接赋值给变量
    const badWord = <span>bad</span>

    return <>
      <button onClick={this.handleClick}>click me {this.state.count} times</button>

      <div>如果表达式返回 null，则冒号后不渲染任何内容：{null}</div>

      {/* isGoodWord 为 true 时，显示 <strong>is good</strong>，否则就隐藏 */}
      <h1>{isGoodWord ? <strong>good</strong> : badWord} </h1>

    </>
  }
}

export {
  MyButton,
}

