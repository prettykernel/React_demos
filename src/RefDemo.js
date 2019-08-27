import React, { Component } from 'react'


export class AutoFocusInput extends Component {
  componentDidMount () {
    // 这里只为了演示 ref 的用法，通常直接用 textarea 的 autofocus 属性即可
    this.input.focus()
  }

  render () {
    //     <input ref={input => this.input = input} autoFocus />
    return <input ref={input => this.input = input} />
  }
}

