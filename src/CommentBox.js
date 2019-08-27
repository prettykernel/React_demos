import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './CommentBox.css'


// 用法：<Comment comment={} index={} onDeleteComment={} />
class Comment extends Component {
    static propTypes = {
        comment: PropTypes.object.isRequired,
        index: PropTypes.number,
        onDeleteComment: PropTypes.func,
    }

    constructor(props) {
        super(props)
        this.state = { timeString: '' }
    }

    componentDidMount() {
        this._updateTimeString()
        this._timerID = setInterval(this._updateTimeString.bind(this), 5000)
    }

    componentWillUnmount() {
        clearInterval(this._timerID)
    }

    _updateTimeString() {
        const duration = (Date.now() - this.props.comment.createdTime) / 1000
        this.setState({
            timeString: duration > 60
                ? `${Math.round(duration / 60)} 分钟前`
                : `${Math.round(Math.max(duration, 1))} 秒前`
        })
    }

    _getProcessedContent(content) {
        return content
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
            .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
    }

    // comments.splice(index, 1)
    handleDeleteComment() {
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(this.props.index)
        }
    }

    // 用户名：内容
    render() {
        const { username, content } = this.props.comment
        return (
            <div className='comment'>
                <div className='comment-user'>
                    <span className='comment-username'>{username}</span>：
                </div>
                <p dangerouslySetInnerHTML={{ __html: this._getProcessedContent(content) }} />
                <span className='comment-createdtime'>
                    {this.state.timeString}
                </span>
                <span onClick={this.handleDeleteComment.bind(this)} className='comment-delete'>
                    删除
                </span>
            </div>
        )
    }
}




class CommentList extends Component {
    static propTypes = {
        comments: PropTypes.array,
        onDeleteComment: PropTypes.func
    }

    static defaultProps = {
        comments: []
    }

    handleDeleteComment(index) {
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(index)
        }
    }

    render() {
        return <>
                {this.props.comments.map((comment, i) =>
                    <Comment
                        comment={comment}
                        key={i}
                        index={i}
                        onDeleteComment={this.handleDeleteComment.bind(this)} />
                )}
        </>
    }
}




class CommentInput extends Component {
    static propTypes = {
        onSubmit: PropTypes.func
    }

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            content: ''
        }
    }

    componentDidMount() {
        this._loadUsername()
        // 加载完成时自动聚焦
        this.textarea.focus()
    }

    _loadUsername() {
        const username = localStorage.getItem('username')
        if (username) {
            this.setState({ username })
        }
    }

    _saveUsername(username) {
        localStorage.setItem('username', username)
    }

    // 离开文本框时
    handleUsernameBlur(event) {
        this._saveUsername(event.target.value)
    }

    handleUsernameChange(event) {
        this.setState({ username: event.target.value })
    }

    handleContentChange(event) {
        this.setState({ content: event.target.value })
    }

    // 提交后清空内容
    handleSubmit() {
        if (this.props.onSubmit) {
            this.props.onSubmit({
                username: this.state.username,
                content: this.state.content,
                createdTime: Date.now()
            })
        }
        this.setState({ content: '' })
    }

    render() {
        return (
            <div className='comment-input'>
                <div className='comment-field'>
                    <span className='comment-field-name'>用户名：</span>
                    <div className='comment-field-input'>
                        <input
                            value={this.state.username}
                            onBlur={this.handleUsernameBlur.bind(this)}
                            onChange={this.handleUsernameChange.bind(this)} />
                    </div>
                </div>
                <div className='comment-field'>
                    <span className='comment-field-name'>评论内容：</span>
                    <div className='comment-field-input'>
                        <textarea
                            ref={textarea => this.textarea = textarea}
                            value={this.state.content}
                            onChange={this.handleContentChange.bind(this)} />
                    </div>
                </div>
                <div className='comment-field-button'>
                    <button onClick={this.handleSubmit.bind(this)}>发布</button>
                </div>
            </div>
        )
    }
}




export default class CommentApp extends Component {
    constructor(props) {
        super(props)
        this.state = { comments: [] }
    }

    componentDidMount() {
        this._loadComments()
    }

    _loadComments() {
        let comments = localStorage.getItem('comments')
        if (comments) {
            comments = JSON.parse(comments)
            this.setState({ comments })
        }
    }

    _saveComments(comments) {
        localStorage.setItem('comments', JSON.stringify(comments))
    }

    // 重绘页面上的 comments 并持久化
    handleSubmitComment(comment) {
        if (!comment) return
        if (!comment.username) return alert('请输入用户名')
        if (!comment.content) return alert('请输入评论内容')
        const comments = this.state.comments
        comments.push(comment)
        this.setState({ comments })
        this._saveComments(comments)
    }

    handleDeleteComment(index) {
        const comments = this.state.comments
        comments.splice(index, 1)
        this.setState({ comments })
        this._saveComments(comments)
    }

    render() {
        return (
            <div className='wrapper'>
                <CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
                <CommentList
                    comments={this.state.comments}
                    onDeleteComment={this.handleDeleteComment.bind(this)} />
            </div>
        )
    }
}

