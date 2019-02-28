import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getUserInfo } from '../actions'
import { connect } from 'react-redux'

class UserInfo extends React.Component {
  state = {}
  componentDidMount() {
    const { loginname } = this.props.match.params
    const { getUserInfo } = this.props
    getUserInfo(loginname)
  }
  // static getDerivedStateFromProps(nextProps, state) {
  //   console.log(nextProps, state)
  //   const { loginname } = nextProps.match.params
  //   const { getUserInfo } = this.props
  //   getUserInfo(loginname)
  //   return null
  // }
  render() {
    const { userinfo, getUserInfo } = this.props
    console.log(userinfo)
    const intro = userinfo ? (
      <div className='userinfo'>
        <User>
          <div className='home'>
            <Link to='/'>主页</Link>
          </div>
          <div className='inner'>
            <Link to={`/user/${userinfo.loginname}`}>
              <img src={userinfo.avatar_url} alt='' />
            </Link>
            <span>{userinfo.loginname}</span>
            <p>{userinfo.score}积分</p>
          </div>
        </User>
        <Create>
          <div className='title'>
            <h4>最近创建的话题</h4>
          </div>
          {(userinfo.recent_topics.length > 5
            ? userinfo.recent_topics.slice(0, 5)
            : userinfo.recent_topics
          ).map(item => (
            <div className='recent_topics' key={item.id}>
              <Link to={`/user/${item.author.loginname}`}>
                <img src={item.author.avatar_url} alt='' />
              </Link>
              <p>
                <Link to={`/topic/${item.id}`}>{item.title}</Link>
              </p>
            </div>
          ))}
        </Create>
        <Create>
          <div className='title'>
            <h4>最近参与的话题</h4>
          </div>
          {(userinfo.recent_replies.length > 5
            ? userinfo.recent_replies.slice(0, 5)
            : userinfo.recent_replies
          ).map(item => (
            <div className='recent_replies' key={item.id}>
              <Link
                to={`/user/${item.author.loginname}`}
                onClick={() => {
                  getUserInfo(item.author.loginname)
                }}
              >
                <img src={item.author.avatar_url} alt='' />
              </Link>
              <p>
                <Link to={`/topic/${item.id}`}>{item.title}</Link>
              </p>
            </div>
          ))}
        </Create>
      </div>
    ) : (
      <div>请稍等……</div>
    )
    return <div>{intro}</div>
  }
}

const mapStateToProps = state => {
  return {
    userinfo: state.userinfo
  }
}
export default connect(
  mapStateToProps,
  { getUserInfo }
)(UserInfo)

const User = styled.div`
  width: 78%;
  background-color: #fff;
  border-radius: 8px;
  .inner {
    padding: 10px;
  }
  .inner > a > img {
    width: 40px;
    height: 40px;
    border-radius: 3px;
  }
  .inner > p {
    margin-top: 10px;
    margin-bottom: 0px;
  }
  .inner > span {
    color: #778087;
    font-size: 16px;
    margin-left: 10px;
  }
  .home {
    padding: 10px;
    background-color: #f6f6f6;
    border-radius: 8px 8px 0 0;
  }
  .home > a {
    color: #80bd01;
  }
`
const Create = styled.div`
  margin-top: 20px;
  width: 78%;
  background-color: #fff;
  border-radius: 8px;
  .title {
    padding: 10px;
    background-color: #f6f6f6;
    border-radius: 8px 8px 0 0;
  }
  .recent_topics {
    display: flex;
    align-items: center;
    padding: 10px;
  }
  .recent_topics > p {
    margin: 0;
  }
  .recent_topics > p > a {
    color: #08c;
  }
  .recent_topics > a > img {
    width: 30px;
    height: 30px;
    border-radius: 3px;
    margin-right: 10px;
  }
  .recent_replies {
    display: flex;
    align-items: center;
    padding: 10px;
  }
  .recent_replies > p {
    margin: 0;
  }
  .recent_replies > p > a {
    color: #08c;
  }
  .recent_replies > a > img {
    width: 30px;
    height: 30px;
    border-radius: 3px;
    margin-right: 10px;
  }
`
