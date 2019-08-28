import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './CommentBox.css'


class CommentInput extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    }

    textareaRef = React.createRef()

    inputRef = React.createRef()

    cachedLastUsername = null

    state = {
        username: '',
        content: '',
    }

    render() {
        return (
            <div className='comment-input'>
                <div className='comment-field'>
                    <span className='comment-field-name'>用户名：</span>
                    <div className='comment-field-input'>
                        <input
                            ref={this.inputRef}
                            value={this.state.username}
                            onBlur={this.handleUsernameBlur}
                            onChange={this.handleUsernameChange} />
                    </div>
                </div>
                <div className='comment-field'>
                    <span className='comment-field-name'>评论内容：</span>
                    <div className='comment-field-input'>
                        <textarea
                            ref={this.textareaRef}
                            value={this.state.content}
                            onChange={this.handleContentChange} />
                    </div>
                </div>
                <div className='comment-field-button'>
                    <button onClick={this.handleSubmit}>发布</button>
                </div>
            </div>
        )
    }

    /* TODO 应该有一个是否匿名的选择框
       如果用户名为空，聚焦到用户名
       否则，聚焦到文本框
       
    */
    componentDidMount() {
        const username =  this._loadUsername()
        if (username) {
            if (username !== this.cachedLastUsername)  {
                this.setState({ username })
                this._saveUsername(username) 
            }
            // 加载完成时自动聚焦
            this.textareaRef.current.focus()
        } else {
            this.inputRef.current.focus()
        }
    }

    _loadUsername() {
        return localStorage.getItem('username')
    }
 
    _saveUsername(username) {
        this.cachedLastUsername = username
        localStorage.setItem('username', username)
    }

    // 离开用户名 <input> 框时
    handleUsernameBlur = (event) => {
        if (this.state.username && this.state.username !== this.cachedLastUsername) this._saveUsername(event.target.value)
    }

    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value })
    }

    handleContentChange = (event) => {
        this.setState({ content: event.target.value })
    }

    // 提交后清空内容
    handleSubmit = () => {
        this.props.onSubmit({
            username: this.state.username,
            content: this.state.content,
            createdTime: Date.now(),
        })
        this.setState({ content: '' })
    }
}



// 用法：<Comment comment={} index={} onDeleteComment={} />
class Comment extends Component {
    static propTypes = {
        comment: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired,
        onDeleteComment: PropTypes.func.isRequired,
    }

    timerID = null

    state = { timeString: '' }

    componentDidMount() {
        this._updateTimeString()
        this.timerID = setInterval(this._updateTimeString, 5000)
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    _updateTimeString = () => {
        const duration = (Date.now() - this.props.comment.createdTime) / 1000
        this.setState({ timeString:
            duration < 60       ? `${Math.round(Math.max(duration, 1))} 秒前发布` :
            duration < 3600     ? `${Math.round(duration / 60)} 分钟前发布` :
            duration < 86400    ? `${Math.round(duration / 3600)} 小时前发布` :
            duration < 2592000  ? `${Math.round(duration / 86400)} 天前发布` :
            duration < 31536000 ? `${Math.round(duration / 2592000)} 月前发布` :
                                  `${Math.round(duration / 31536000)} 年前发布`
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
    handleDeleteComment = () => {
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
                <pre dangerouslySetInnerHTML={{ __html: this._getProcessedContent(content) }} />
                <span className='comment-createdtime'>
                    {this.state.timeString}
                </span>
                <span onClick={this.handleDeleteComment} className='comment-delete'>
                    删除
                </span>
            </div>
        )
    }
}




class CommentList extends Component {
    static propTypes = {
        comments: PropTypes.array.isRequired,
        onDeleteComment: PropTypes.func.isRequired,
    }

    static defaultProps = {
        comments: []
    }

    handleDeleteComment = (index) => {
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(index)
        }
    }

    render() {
        return <>
                {this.props.comments.map((comment, i) =>
                    <Comment
                        key={i}
                        comment={comment}
                        index={i}
                        onDeleteComment={this.handleDeleteComment} />
                )}
        </>
    }
}


export default class CommentApp extends Component {
    state = { comments: [] }

    render() {
        return (
            <div className='wrapper'>
                <CommentInput onSubmit={this.handleSubmitComment} />
                <CommentList comments={this.state.comments} onDeleteComment={this.handleDeleteComment} />
            </div>
        )
    }

    componentDidMount() {
        this._loadComments()
    }

    _loadComments() {
        const comments = localStorage.getItem('comments')
        if (comments) {
            this.setState({ comments: JSON.parse(comments) })
        }
    }

    _saveComments(comments) {
        localStorage.setItem('comments', JSON.stringify(comments))
    }

    // 重绘页面上的 comments 并持久化
    handleSubmitComment = (comment) => {
        if (comment) {
            if (!comment.username) return alert('请输入用户名')
            if (!comment.content) return alert('请输入评论内容')
            const comments = this.state.comments
            comments.push(comment)
            this.setState({ comments })
            this._saveComments(comments)
        }
    }

    handleDeleteComment = (index) => {
        const comments = this.state.comments
        comments.splice(index, 1)
        this.setState({ comments })
        this._saveComments(comments)
    }
}

