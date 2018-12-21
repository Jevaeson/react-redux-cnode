import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'

class Home extends Component {
  state = {
    topics: [],
    type: 'all'
  }
  getTopics = type => {
    const url = `https://cnodejs.org/api/v1/topics?tab=${type}`
    axios.get(url).then(res => {
      this.setState({ topics: res.data.data })
    })
  }
  handelTab = type => {
    console.log(type)
    this.setState({
      type: type
    })
    this.getTopics(type)
  }
  componentDidMount() {
    const { type } = this.state
    this.getTopics(type)
  }

  render() {
    const navArr = [
      {
        type: 'all',
        txt: '全部'
      },
      {
        type: 'good',
        txt: '精华'
      },
      {
        type: 'share',
        txt: '分享'
      },
      {
        type: 'ask',
        txt: '问答'
      },
      {
        type: 'job',
        txt: '招聘'
      }
    ]
    const nav = navArr.map(e => (
      <li key={e.type}>
        <Btn
          style={
            this.state.type === e.type
              ? {
                  backgroundColor: '#80bd01',
                  color: '#fff'
                }
              : {}
          }
          onClick={() => this.handelTab(e.type)}
        >
          {e.txt}
        </Btn>
      </li>
    ))
    const { topics } = this.state
    const topic = topics.length ? (
      <ul className="topics">
        {topics.map(topic => (
          <li key={topic.id}>{topic.title}</li>
        ))}
      </ul>
    ) : (
      <div>请稍等……</div>
    )
    return (
      <Wrap>
        <nav>
          <Nav>{nav}</Nav>
        </nav>
        {topic}
      </Wrap>
    )
  }
}

export default Home
const Wrap = styled.div`
  width: 70%;
  border-radius: 8px;
  background-color: #fff;
`
const Nav = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  height: 40px;
  background-color: #f6f6f6;
  align-items: center;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  li {
    color: #80bd01;
    margin-left: 20px;
  }
`
const Btn = styled.span`
  padding: 2px 4px;
  border-radius: 3px;
  cursor: pointer;
`
