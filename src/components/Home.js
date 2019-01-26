import React, { Component } from 'react'
import styled from 'styled-components'
import { Route, NavLink } from 'react-router-dom'
import Topics from './Topics'
import Me from './Me'

class Home extends Component {
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
        <NavLink
          to={`/${e.type === 'all' ? '' : e.type}`}
          exact={e.type === 'all' ? true : false}
        >
          {e.txt}
        </NavLink>
      </li>
    ))
    return (
      <Bigbox>
        <Wrap>
          <nav>
            <Nav>{nav}</Nav>
          </nav>
          <Route component={Topics} path='/' exact />
          <Route component={Topics} path='/good' />
          <Route component={Topics} path='/ask' />
          <Route component={Topics} path='/share' />
          <Route component={Topics} path='/job' />
        </Wrap>
        <Me />
      </Bigbox>
    )
  }
}

export default Home
const Bigbox = styled.div`
  display: flex;
  justify-content: space-between;
`
const Wrap = styled.div`
  width: 78%;
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
    margin-left: 20px;
  }
  li a {
    color: #80bd01;
    padding: 2px 4px;
    border-radius: 4px;
  }
  li .active {
    background-color: #80bd01;
    color: #fff;
  }
`
