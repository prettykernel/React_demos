import React, { Component } from 'react';


export default class 受控组件 extends Component {
  state = { isLiked: false }

  handleClick = () => {
    this.setState({isLiked: !this.state.isLiked})
  }

  render () {
    // this.props 的所有成员都应该是 readonly 的
    const likedText = this.props.likedText || '取消'
    const unlikedText = this.props.unlikedText || '点赞'
    return (
      <button onClick={this.props.onClick || this.handleClick}>
        {this.state.isLiked ? likedText : unlikedText} 👍
      </button>
    )
  }
}
