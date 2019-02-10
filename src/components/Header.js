import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Header extends Component {
  state = {
    token: '9948d556-1825-416f-934f-b3ce046403e3',
    userInfo: null
  }
  componentDidMount() {
    if (sessionStorage.loginname && sessionStorage.avatar_url) {
      this.setState({
        userInfo: {
          loginname: sessionStorage.loginname,
          avatar_url: sessionStorage.avatar_url
        }
      })
    }
  }
  render() {
    const { userInfo, token } = this.state
    return (
      <Head>
        <div className='container'>
          <Link to='/'>
            <img
              src='https://static2.cnodejs.org/public/images/cnodejs_light.svg'
              alt=''
            />
          </Link>
          {userInfo ? (
            <div>
              <img src={userInfo.avatar_url} alt='' />
              <button onClick={this.logout}>注销</button>
            </div>
          ) : (
            <div>
              <input type='text' value={token} onChange={this.hanldeInput} />
              <button onClick={this.login}>登录</button>
            </div>
          )}
        </div>
      </Head>
    )
  }
  hanldeInput = event => {
    this.setState({
      token: event.target.value
    })
  }
  login = () => {
    const { token } = this.state
    const { setLogin } = this.props
    if (token.trim()) {
      axios
        .post('https://cnodejs.org/api/v1/accesstoken', {
          accesstoken: token
        })
        .then(res => {
          // 当用户登录成功的时候 将用户的信息存储到浏览器中
          // localStorage(无时间限制）   sessionStorage     cookie
          // sessionStorage 不能存储对象
          // sessionStorage.removeItem(loginname)
          // sessionStorage.clear()

          // 发 post 请求更新网上的数据 但是返回值并不是新的评论对象 而且评论对象内容很多
          // 要更新本地的 评论 直接重新请求该文章的数据
          const { loginname, avatar_url, id } = res.data

          sessionStorage.loginname = loginname
          sessionStorage.avatar_url = avatar_url
          sessionStorage.id = id
          sessionStorage.token = token
          setLogin(true)
          this.setState({
            userInfo: {
              loginname,
              avatar_url
            },
            token: ''
          })
        })
        .catch(err => {
          alert('不对哦')
        })
    }
  }
  logout = () => {
    this.setState({
      userInfo: null
    })
    sessionStorage.clear()
    const { setLogin } = this.props
    setLogin(false)
  }
}

export default Header
const Head = styled.header`
  width: 100%;
  display: flex;
  height: 50px;
  align-items: center;
  background-color: #444;
  .container {
    width: 85%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .container > a > img {
    width: 120px;
    height: 28px;
  }
  .container > div {
    display: flex;
    align-items: center;
  }
  .container > div > input {
    border-radius: 3px;
    outline: none;
    border: none;
  }
  .container > div > button {
    margin-left: 10px;
    border-radius: 3px;
    background-color: #80bd01;
    color: #fff;
    border: none;
    cursor: pointer;
  }
  .container > div > a {
    height: 24px;
    margin-left: 10px;
    border-radius: 3px;
    background-color: #80bd01;
    color: #fff;
    padding: 0px 10px;
  }
  .container > div > button:focus {
    outline: none;
  }
  .container > div > img {
    width: 30px;
    height: 30px;
    border-radius: 3px;
  }
`
