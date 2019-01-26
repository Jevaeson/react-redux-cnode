import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  getTopic,
  addComment,
  ups,
  showArea,
  addOtherComment,
  collect
} from '../actions'
import styled from 'styled-components'
import { filter } from '../static/filter'
import { Link } from 'react-router-dom'
import Author from './Author'

class Topic extends Component {
  state = {
    comment: '',
    otherComment: ''
  }
  componentDidMount() {
    const { id } = this.props.match.params
    const { token } = sessionStorage
    const { getTopic } = this.props
    getTopic(token, id)
  }

  render() {
    const { topic } = this.props
    const { otherComment, comment } = this.state
    const { token } = sessionStorage

    const article = topic ? (
      <Wrap>
        <h2>{topic.title}</h2>
        <Ifo>
          ·作者{topic.author.loginname}·来自{filter(topic.tab)}
        </Ifo>
        <button
          onClick={() => {
            this.collect(topic.id)
          }}
        >
          {topic.is_collect ? '取消收藏' : '收藏'}
        </button>
        <div
          className='content'
          dangerouslySetInnerHTML={{ __html: topic.content }}
        />
      </Wrap>
    ) : (
      <div>请稍等</div>
    )

    const replayList = !topic ? (
      <div>请稍等</div>
    ) : (
      <div>
        {topic.replies.length === 0
          ? '评论为空'
          : topic.replies.map(reply => (
              <div key={reply.id}>
                <Link to={`/user/${reply.author.loginname}`}>
                  <img
                    style={{ width: '30px', borderRadius: ' 3px' }}
                    src={reply.author.avatar_url}
                    alt=''
                  />
                </Link>
                <span style={{ marginLeft: '5px' }}>
                  {reply.author.loginname}
                </span>
                <div>
                  <button
                    onClick={() => {
                      this.ups(reply.id)
                    }}
                  >
                    点赞
                  </button>
                  {reply.ups.length}
                </div>
                <p dangerouslySetInnerHTML={{ __html: reply.content }} />
                <button
                  onClick={() => {
                    this.showArea(reply.author.loginname, reply.id)
                  }}
                >
                  回复
                </button>
                {reply.isShowArea ? (
                  <div>
                    <textarea
                      value={otherComment}
                      onChange={this.handelOtherComment}
                    />
                    <button
                      onClick={() => {
                        this.addOtherComment(reply.id)
                      }}
                    >
                      回复
                    </button>
                  </div>
                ) : (
                  ''
                )}
              </div>
            ))}
      </div>
    )
    const createReply = token ? (
      <CreateReply>
        <div className='title'>添加回复</div>
        <div className='inner'>
          <textarea value={comment} onChange={this.handelComment} />
          <button onClick={() => this.addComment(topic.id)}>回复</button>
        </div>
      </CreateReply>
    ) : (
      ''
    )

    return (
      <>
        {article}
        <Reply>
          <div className='title'>回复</div>
          <div className='inner'>{replayList}</div>
        </Reply>
        {createReply}
        <Author topic={topic} />
      </>
    )
  }
  handelComment = event => {
    this.setState({
      comment: event.target.value
    })
  }
  handelOtherComment = event => {
    this.setState({
      otherComment: event.target.value
    })
  }
  showArea = (loginname, replyId) => {
    const { showArea } = this.props
    showArea(replyId)
    this.setState({
      otherComment: `@${loginname} `
    })
  }
  // addComment = () => {
  //   const { id } = this.props.match.params
  //   const { getTopic, topic } = this.props
  //   const { comment } = this.state
  //   const { token } = sessionStorage
  //   axios
  // .post(`https://cnodejs.org/api/v1//topic/${topic.id}/replies`, {
  //   accesstoken: token,
  //   content: comment
  // })
  //     .then(res => {
  //       getTopic(token, id)
  //       this.setState({
  //         comment: ''
  //       })
  //     })
  // }
  addComment = () => {
    const { id } = this.props.match.params
    const { getTopic, topic, addComment } = this.props
    const { comment } = this.state
    const { token } = sessionStorage
    addComment(topic, comment, token, id, getTopic, () => {
      this.setState({
        comment: ''
      })
    })
  }
  addOtherComment = replyId => {
    const { id } = this.props.match.params
    const { getTopic, topic, addOtherComment } = this.props
    const { otherComment } = this.state
    const { token } = sessionStorage
    addOtherComment(topic, otherComment, token, id, replyId, getTopic, () => {
      this.setState({ otherComment: '' })
    })
  }
  ups = id => {
    const { token } = sessionStorage
    const userId = sessionStorage.id
    const { ups } = this.props
    ups(token, id, userId)
  }
  collect = id => {
    const { topic, collect } = this.props
    const { token } = sessionStorage
    const isCollect = topic.is_collect
    collect(id, token, isCollect)
  }
}

const mapStateToProps = state => {
  return {
    topic: state.topic
  }
}
export default connect(
  mapStateToProps,
  { getTopic, addComment, ups, showArea, addOtherComment, collect }
)(Topic)

const Wrap = styled.div`
  width: 78%;
  border-radius: 8px;
  background-color: #fff;
  padding: 20px;
  padding-bottom: 10px;
  .content img {
    width: 100%;
  }
`
const Ifo = styled.span`
  font-size: 12px;
  color: #838383;
  margin-bottom: 20px;
  display: block;
`
const Reply = styled.div`
  width: 78%;
  background-color: #fff;
  margin-top: 20px;
  border-radius: 8px;
  > .title {
    width: 100%;
    padding: 10px;
    background-color: #f6f6f6;
    border-radius: 8px 8px 0 0;
  }
  > .inner {
    padding: 10px;
    background-color: #fff;
    border-radius: 0px 0px 8px 8px;
  }
  > .inner p {
    margin: 0;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  > .inner button {
    border-radius: 3px;
    background-color: #80bd01;
    color: #fff;
    border: none;
    cursor: pointer;
    margin-bottom: 10px;
  }
`
const CreateReply = styled.div`
  width: 78%;
  background-color: #fff;
  margin-top: 20px;
  border-radius: 8px;
  .title {
    width: 100%;
    padding: 10px;
    background-color: #f6f6f6;
    border-radius: 8px 8px 0 0;
  }
  .inner {
    padding: 10px;
    background-color: #fff;
    border-radius: 0px 0px 8px 8px;
  }
  .inner textarea {
    width: 200px;
    height: 100px;
    outline: none;
    border: none;
    border: 1px solid #ccc;
    border-radius: 3px;
    resize: none;
  }
  .inner button:hover {
    background-color: #05c;
  }
  .inner button {
    width: 50px;
    display: block;
    color: #fff;
    background-color: #00b3d4;
    border: none;
    border-radius: 3px;
    outline: none;
    transition: all 500ms ease;
  }
`
