const userinfo = (state = null, action) => {
  switch (action.type) {
    case 'GET_USERINFO':
      return action.userinfo
    default:
      return state
  }
}

export default userinfo
