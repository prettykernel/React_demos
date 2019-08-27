import React, { Component } from 'react'
import PropTypes from 'prop-types'

/*
React 组件是为了构建大型应用程序而生。但因为 JavaScript 的弱类型特性，你在编写了一个组件以后，根本不知道别人会怎么使用你的组件，往里传什么乱七八糟的参数，例如评论组件：
class Comment extends Component {
  const { comment } = this.props
  render () {
    return (
      <div className='comment'>
        <div className='comment-user'>
          <span>{comment.username} </span>：
        </div>
        <p>{comment.content}</p>
      </div>
    )
  }
}

<Comment comment={1} />
JavaScript 不会报错，但页面显示不正常。

于是 React 就提供了一种机制，让你可以给组件的配置参数加上类型验证。例如上述的评论组件，可以配置 Comment 只能接受对象类型的 comment 参数，传个数字进来，组件就强制报错。

prop-types 可以帮助验证 props 的参数类型。
可以通过 isRequired 来强制组件某个参数必须传入。

虽然 propTypes 指定了参数类型，但这些参数默认都是可选的。
可以通过配置 defaultProps，让它在不传入的时候有默认值。否则，参数默认为 undefined。

React 提供的 PropTypes 提供了一系列的数据类型可以用来配置组件的参数：
PropTypes.array
PropTypes.bool
PropTypes.func
PropTypes.number
PropTypes.object
PropTypes.string
PropTypes.node
PropTypes.element
更多类型及其用法，参考官方文档：https://zh-hans.reactjs.org/docs/typechecking-with-proptypes.html。




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

