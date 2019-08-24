import React from 'react'


export default class GitHubAPI extends React.Component {
  state = {
    loading: true,
    error: null,
    data: null,
  }

  // JSON 数据在线生成：
  //   jsonplaceholder.typicode.com
  //   myjson.com
  async componentDidMount() {
    const url = 'https://api.github.com/search/repositories?q=java&sort=stars'
    try {
      const response = await fetch(url)
      if (response.ok) {
        this.setState({ loading: false, data: await response.json()})
      } else {
        this.setState({ loading: false, error: 'Network Request Timedout.' })
      }
    } catch (e) {
      this.setState({ loading: false, error: e.message })
    }
  }

  render() {
    if (this.state.loading) {
      return <span>Loading...</span>
    } else if (this.state.error !== null) {
      return <span>Error: {this.state.error}</span>
    } else {
      const projects = this.state.data.items
      const results = []
      projects.forEach((p, i) => {
        const item = <li key={i}>{p.name}</li>
        results.push(item)
      })
      console.log(this.state.data)
      return <>
        <p> GitHub API 数据获取成功：</p>
        {/* 两格缩进，使用 <pre> 标签避免 HTML 渲染时忽略空格 */}
        <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
        <p>{results}</p>
      </>
    }
  }
}

