import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Me extends Component {
  render() {
    const { isLogin } = this.props
    const { loginname, avatar_url } = sessionStorage
    const inner = isLogin ? (
      <div className='inner'>
        <Link to={`/user/${loginname}`}>
          <img src={avatar_url} alt='' />
        </Link>
        <span>{loginname}</span>
        <Link to='/topic/create' className='create'>
          发布话题
        </Link>
      </div>
    ) : (
      <div>请登录</div>
    )
    return (
      <Wrap>
        <div className='top'>个人信息</div>
        {inner}
      </Wrap>
    )
  }
}

const mapStateToProps = state => {
  return { isLogin: state.isLogin }
}
export default connect(mapStateToProps)(Me)
const Wrap = styled.div`
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
  .inner > .create {
    line-height: 30px;
    width: 100px;
    border-radius: 3px;
    background-color: #80bd01;
    color: #fff;
    padding: 0px 10px;
    display: block;
    text-align: center;
    margin-top: 20px;
  }
`
