import React, { Component } from 'react'
import PropTypes from 'prop-types'


/*
做一个百分比换算器，需要完成三个组件：
<Input />：封装了原生的<input />，可以输入任意数字
<PercentageShower />：实时 显示 <Input /> 中的数字内容，但是需要把它转换成百分比，例如 <Input /> 输入的是 0.1，那么就要显示 10.00%，保留两位小数。
<PercentageApp />：组合上述两个组件。
*/


class Input extends Component {
  static propTypes = {
    onSetNum: PropTypes.func.isRequired
  }

  static defaultProps = {
    onSetNum() { throw Error('必须传入 this.props.onSetNum') }
  }

  handleChange = event => {
    this.props.onSetNum(event.target.value)
  }
  render () {
    return <input type='number' onChange={this.handleChange} />
  }
}


const PercentageShower = ({ num }) => {
  const n = num * 100
  return <div>{n.toFixed(2) + '%'}</div>
}


export default class DefaultPropsAndPropTypes extends Component {
  state = { num: 0 }

  render () {
    return <>
      <Input onSetNum={num => this.setState({num})} />
      <PercentageShower num={this.state.num}/>
    </>
  }
}

