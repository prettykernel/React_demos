import React from 'react'


const users = [
  { id: 0, username: 'Jerry', age: 21, gender: 'male' },
  { id: 1, username: 'Tomy', age: 22, gender: 'male' },
  { id: 2, username: 'Lily', age: 19, gender: 'female' },
  { id: 3, username: 'Lucy', age: 20, gender: 'female' },
]


// 把渲染单个用户的结构抽象为一个组件，通过 props 把 user 数组作为组件的配置参数
// 解构赋值的语义是：如果调用 User 组件时传入的 props 中包含 user 属性，就从 user 中解构出 username, age, gender，相当于：
// const username = props.user.username
// const age = props.user.age
// const gender = props.user.gender
const User = ({ user: { username, age, gender }}) => <>
  <div>姓名：{username}</div>
  <div>年龄：{age}</div>
  <div>性别：{gender}</div>
  <hr/>
</>


// ItemList 可以渲染任何元素列表，相当于一个泛型容器
// export 后不加 default 时，App.js 中 import 时，ItemList 两侧需要加大括号
export const ItemList = () => <>
  {/*
    使用 map 渲染列表数据。
    数组中的每个 JSX 元素加上 key 属性，key 必须是每个元素唯一的标识。
    在可变数组中，不要用数组下标 i 作为 key(会影响 DOM diff)，推荐使用服务端返回的全局唯一 id。
    因为同一个元素在数组中的位置可能发生变化，而后台 id 都是唯一的。
  */}
  {users.map(user => <User user={user} key={user.id} />)}
</>




/*
React 的高效依赖于 Virtual-DOM 策略。简单来说，能复用的话 React 就会尽量复用，没有必要的话绝对不碰 DOM。对于列表元素来说也是这样，但是处理列表元素的复用性会有一个问题：元素可能会在一个列表中改变位置。

例如，假设页面上有3个列表元素：
<div>a</div>
<div>b</div>
<div>c</div>

现在改变一下位置：
<div>a</div>
<div>c</div>
<div>b</div>

c 和 b 的位置互换，React 只需要交换一下 DOM 位置就行了，但是它并不知道其实只是改变了元素的位置，所以它会重新渲染后面两个元素（再执行 Virtual-DOM 策略），这样会大大增加 DOM 操作。但如果给每个元素加上唯一的标识，React 就可以知道这两个元素只是交换了位置：
<div key='a'>a</div>
<div key='b'>b</div>
<div key='c'>c</div>
这样 React 就通过 key 判断出来，这两个列表元素只是交换了位置，可以尽量复用元素内部的结构。
*/

