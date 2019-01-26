import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTopics, pageChange } from '../actions'
import styled from 'styled-components'
import { Pagination } from 'antd'
import './topics.css'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import 'moment/locale/zh-cn'

class Topics extends Component {
  componentDidMount() {
    const { pathname } = this.props.location
    const { getTopics } = this.props
    getTopics(pathname)
  }

  render() {
    const { topics } = this.props
    const list = topics.length ? (
      <List>
        {topics.map(e => (
          <li key={e.id}>
            <Link to={`/user/${e.author.loginname}`}>
              <img src={e.author.avatar_url} alt='' />
            </Link>
            <SpanReply>{e.reply_count}</SpanReply>/
            <SpanVisit>{e.visit_count}</SpanVisit>
            {e.top ? <Top>置顶</Top> : ''
            // <Other>{e.tab === 'ask' ? '问答' : '分享'}</Other>
            }
            {e.good ? <Top>精华</Top> : ''
            // <Other>{e.tab === 'ask' ? '问答' : '分享'}</Other>
            }
            <Link to={`/topic/${e.id}`}>{e.title}</Link>
            <Moment fromNow locale='zh-cn' className='time'>
              {e.last_reply_at}
            </Moment>
          </li>
        ))}
      </List>
    ) : (
      <div>请稍等……</div>
    )
    return (
      <div>
        {list}
        <Par>
          <Pagination
            defaultCurrent={1}
            total={400}
            pageSize={40}
            onChange={this.onChange}
          />
        </Par>
      </div>
    )
  }
  onChange = (page, pageSize) => {
    const { pageChange } = this.props
    const { pathname } = this.props.location
    pageChange(pathname, page)
  }
}

const mapStateToProps = state => {
  return {
    topics: state.topics
  }
}
export default connect(
  mapStateToProps,
  { getTopics, pageChange }
)(Topics)

const List = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0;
  li {
    border-bottom: 1px solid #f0f0f0;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    position: relative;
  }
  li:hover {
    background-color: #f5f5f5;
  }
  li img {
    width: 30px;
    height: 30px;
    border-radius: 3px;
    margin-right: 10px;
  }
  li > a {
    color: #333;
  }
  li .time {
    position: absolute;
    right: 20px;
    font-size: 12px;
  }
`
const SpanReply = styled.span`
  color: #9e78c0;
`
const SpanVisit = styled.span`
  font-size: 10px;
  color: #b4b4b4;
  margin-right: 10px;
`
const Top = styled.span`
  background-color: #80bd01;
  margin-right: 5px;
  color: #fff;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 12px;
`
// const Other = styled.span`
//   background-color: #e5e5e5;
//   color: #999;
//   padding: 2px 4px;
//   border-radius: 3px;
//   font-size: 12px;
//   margin-right: 5px;
// `
const Par = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
`
