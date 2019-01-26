import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import Home from './Home'
import Topic from './Topic'
import UserInfo from './UserInfo'
import CreateTopic from './CreateTopic'

class Main extends Component {
  render() {
    return (
      <Wrap>
        <Switch>
          <Route component={UserInfo} path='/user/:loginname' />
          <Route component={CreateTopic} path='/topic/create' />
          <Route component={Topic} path='/topic/:id' />
          <Route component={Home} path='/' />
        </Switch>
      </Wrap>
    )
  }
}

export default Main

const Wrap = styled.div`
  width: 85%;
  margin: 20px auto 0;
  position: relative;
`
