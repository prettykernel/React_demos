import React, { Component } from 'react'


export default class extends Component {
  constructor () {
    super()
    console.log('construct')
  }

  UNSAFE_componentWillMount () {
    console.log('component will mount')
  }

  render () {
    console.log('render')
    return <h1 className='title'>React Component LifeCycle</h1>
  }

  componentDidMount () {
    console.log('挂载组件时，React 会在 render() 把 DOM 元素插入页面后，再调用 componentDidMount')
  }

  componentWillUnmount() {
    console.log('在组件从页面删除之前，React 会调用 componentWillUnmount')
  }
}

