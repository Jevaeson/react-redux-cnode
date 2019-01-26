import React, { Component } from 'react'
import './static/gloable.css'
import { BrowserRouter } from 'react-router-dom'
import Main from './components/Main'
import Header from './components/Header'
import { creatLogin } from './actions/'
import { connect } from 'react-redux'

class App extends Component {
  componentDidMount() {
    // 处理刷新的时候状态变回原来
    const { loginname, avatar_url } = sessionStorage
    const { creatLogin } = this.props
    const bool = loginname && avatar_url ? true : false
    creatLogin(bool)
  }
  render() {
    return (
      <BrowserRouter>
        <div style={{ backgroundColor: '#e1e1e1', paddingBottom: '20px' }}>
          <Header setLogin={this.setLogin} />
          <Main />
        </div>
      </BrowserRouter>
    )
  }
  setLogin = bool => {
    const { creatLogin } = this.props
    creatLogin(bool)
  }
}

const mapStateToProps = state => {
  return { isLogin: state.isLogin }
}
export default connect(
  mapStateToProps,
  { creatLogin }
)(App)
