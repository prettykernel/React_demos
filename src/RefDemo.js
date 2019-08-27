import React, { Component } from 'react'


export class AutoFocusInput extends React.Component {
  inputRef = React.createRef()

  componentDidMount () {
    // 这里只为了演示 ref 的用法，通常直接用 textarea 的 autofocus 属性即可
    this.inputRef.current.focus()
  }

  render () {
    //     <input autoFocus />
    return <input ref={this.inputRef} />
  }
}
