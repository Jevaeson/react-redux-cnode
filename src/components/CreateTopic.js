import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
class CreateTopic extends Component {
  state = {
    title: '',
    content: ''
  }
  handelChange = (text, event) => {
    this.setState({
      [text]: event.target.value
    })
  }
  handelSubmit = () => {
    const { title, content } = this.state
    if (title.trim().length >= 7 && content.trim()) {
      const contentObj = {
        accesstoken: '9948d556-1825-416f-934f-b3ce046403e3',
        title,
        content,
        tab: 'dev'
      }
      const uri = 'https://cnodejs.org/api/v1/topics'
      axios.post(uri, contentObj).then(res => {
        this.setState({
          title: '',
          content: ''
        })
        this.props.history.push(`/topic/${res.data.topic_id}`)
      })
    } else {
      alert('输入不正确')
    }
  }
  render() {
    const { title, content } = this.state
    console.log('title---', title, 'content---', content)
    return (
      <Wrap>
        <div className="home">
          <Link to="/">主页</Link>
          <span>/发布话题</span>
        </div>
        <div className="inner">
          <Span>标题</Span>
          <input
            type="text"
            value={title}
            onChange={event => this.handelChange('title', event)}
          />
          <Span>内容</Span>
          <textarea
            value={content}
            onChange={event => this.handelChange('content', event)}
          />
          <button onClick={this.handelSubmit}>提交</button>
        </div>
      </Wrap>
    )
  }
}

export default CreateTopic
const Wrap = styled.div`
  width: 78%;
  border-radius: 8px;
  background-color: #fff;
  .home {
    padding: 10px;
    background-color: #f6f6f6;
    border-radius: 8px 8px 0 0;
  }
  .home > a {
    color: #80bd01;
  }
  .inner {
    padding: 10px;
  }
  .inner input {
    width: 200px;
    outline: none;
    border: none;
    border: 1px solid #ccc;
    border-radius: 3px;
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
const Span = styled.span`
  display: block;
  margin-bottom: 10px;
`
