import React, { Component } from 'react';


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
      <button onClick={this.handleClick}>click me {this.state.count}</button>

      <div>如果表达式返回 null，则冒号后不渲染任何内容：{null}</div>

      {/* isGoodWord 为 true 时，显示 <strong>is good</strong>，否则就隐藏 */}
      <h1>{isGoodWord ? <strong>good</strong> : badWord} </h1>

    </>
  }
}


export default MyButton







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

标签属性 class 是 JavaScript 的关键字，在 JSX 中用 className 代替，for 属性用 htmlFor 代替。

标签名和标签属性都可以使用 {} 表达式。

与普通的 HTML 标签一样，组件内部可以嵌套其它组件，最后构成一个组件树。数据在组件树内自上往下流动。

*/

