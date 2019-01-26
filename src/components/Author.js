import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
// import axios from 'axios'

class Author extends Component {
  render() {
    const { topic } = this.props
    const inner = topic ? (
      <div className="inner">
        <Link to={`/user/${topic.author.loginname}`}>
          <img src={topic.author.avatar_url} alt="" />
        </Link>
        <span>{topic.author.loginname}</span>
      </div>
    ) : (
      <div>请稍等</div>
    )
    return (
      <Wrap>
        <div className="top">作者</div>
        {inner}
      </Wrap>
    )
  }
}

export default Author
const Wrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 290px;
  height: 170px;
  border-radius: 8px;
  background-color: #fff;
  .top {
    height: 40px;
    color: #51585c;
    padding: 10px;
    background-color: #f6f6f6;
    border-radius: 8px;
    border-bottom-left-radius: none;
    border-bottom-left-radius: none;
  }
  .inner {
    padding: 10px;
  }
  .inner > a > img {
    width: 48px;
    height: 48px;
    border-radius: 3px;
  }
  .inner > span {
    color: #778087;
    font-size: 16px;
    margin-left: 5px;
  }
`
