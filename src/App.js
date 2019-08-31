import React from 'react'
import logo from './logo.svg'
import './App.css'
import {MyButton} from './MyButton'
import 受控组件 from './受控组件'
import {ItemList} from './ItemList'
import {LessonList, lessons} from './LessonList'
import CommentApp from './CommentBox'
import DefaultPropsAndPropTypes from './DefaultPropsAndPropTypes'
import ComponentLifeCycle from './ComponentLifeCycle'
import GitHubAPI from './GitHubAPI'
import ClockViewer from './Clock'
import Tabs from './Tabs'
//import {} from './RefDemo'


export default () => <>
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

  <br/>
  <DefaultPropsAndPropTypes />

  <br/>
  <ComponentLifeCycle />

  <br/>
  <ClockViewer />

  <br/>
  <Tabs defaultTabIndex={1} />

  <br/>




  <br/>
  <CommentApp />

  <GitHubAPI />
</>




// 普通 JS 代码中可以使用 // 或 {/**/} 注释，JSX 中只能用 {/**/}。


/*
https://www.html.cn/create-react-app/
npx create-react-app react_demos
cd react_demos
yarn start
touch /src/MyButton.js

Webpack 只处理 src 中的文件。必须将所有 JS 和 CSS 文件放在 src 中，否则 Webpack 将发现不了它们。

public/index.html 是页面模板。
src/index.js 是 JavaScript 入口点。
只能在 public/index.html 中使用 public 中的文件。
可以创建其他你想要的顶级目录。它们不会包含在生产版本中，因此你可以将它们用于文档等内容。




JSX 中使用双引号，其它地方使用单引号。

自定义的组件必须用大写字母开头，普通 HTML 标签用小写字母开头。
JSX 标记可以直接使用属性语法，例如 <menu.Item />。

标签属性 class 是 JavaScript 的关键字，在 JSX 中用 className 代替，for 属性用 htmlFor 代替。

标签名和标签属性都可以使用 {} 表达式。

与普通的 HTML 标签一样，组件内部可以嵌套其它组件，最后构成一个组件树。数据在组件树内自上往下流动。

*/



