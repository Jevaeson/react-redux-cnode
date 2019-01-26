const topics = (state = [], action) => {
  switch (action.type) {
    case 'GET_TOPICS':
      return action.topics
    default:
      return state
  }
}

export default topics
