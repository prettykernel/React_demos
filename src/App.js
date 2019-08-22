import React from 'react'
import logo from './logo.svg'
import './App.css'
import MyButton from './MyButton'
import 受控组件 from './受控组件'
import {ItemList} from './ItemList'
import {LessonList, lessons} from './LessonList'

function App() {
  return <>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>

    <MyButton />

    {/* 在使用一个组件时，JSX 标签的所有属性都会作为 props 对象的键值，组件内部通过 this.props 读取参数。 */}
    <受控组件 likedText='已赞' unlikedText='赞' />

    {/*
      JSX 的 {} 内可以嵌入任何表达式，{{}} 就是在 {} 内部包含一个对象字面量作为表达式返回值。
      点赞按钮的内部用 this.props.wordings.likeText 获取参数。
    */}
    <受控组件 wordings={{likedText: '已赞', unlikedText: '赞'}} />

    {/* 往组件内部传入函数作为参数 */}
    <受控组件
      wordings={{likedText: '已赞', unlikedText: '赞'}}
      onClick={() => console.log('Click on like button!')}
    />

    <br/>
    <ItemList />

    <br/>
    <LessonList lessons={lessons} />


  </>
}

export default App





