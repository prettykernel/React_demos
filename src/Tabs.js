import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'


const tabs = [
  { id: 0, name: 'Tab0', content: 'Tab 0 内容' },
  { id: 1, name: 'Tab1', content: 'Tab 1 内容' },
  { id: 2, name: 'Tab2', content: 'Tab 2 内容' },
  { id: 3, name: 'Tab3', content: 'Tab 3 内容' },
]


const Tab = ({name}) =>
  <div>
    {name}
  </div>


export default class Tabs extends Component {
  static propTypes = {
    defaultTabIndex: PropTypes.number.isRequired,
  }

  state = {
    currentTabIndex: this.props.defaultTabIndex,
  }

  handleClick = (event) => {
    this.setState({ currentTabIndex: event.target.innerText[3] })
    event.stopPropagation()
    // target 是某个实际触发事件的子元素，currentTarget 是处理事件的元素
    // console.log(event.target, event.currentTarget)
  }

  // 使用 this.props.children.map 会报错：
  // Each child in an array or iterator should have a unique "key" prop.
  render() {
    const i = this.state.currentTabIndex
    return <>
      <span>现在位于 TAB {i}</span>
      <div onClick={this.handleClick}>
        {tabs.map(({id, name}) => <Tab key={id} name={name} />)}
      </div>
      <span>{tabs[i].content}</span>
    </>
  }
}

ReactDOM.render(
  <Tabs defaultTabIndex={1} />,
  document.getElementById('root')
)

