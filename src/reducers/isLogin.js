const isLogin = (state = null, action) => {
  switch (action.type) {
    case 'CREAT_LOGIN':
      return action.isLogin
    default:
      return state
  }
}

export default isLogin
