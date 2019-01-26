const topic = (state = null, action) => {
  switch (action.type) {
    case 'GET_TOPIC':
      return action.topic
    // ADD_COMMENT 可以不写
    // case 'ADD_COMMENT':
    case 'SHOW_AREA':
      const newTopic2 = { ...state }
      const { replyId } = action
      newTopic2.replies = newTopic2.replies.map(e => {
        if (e.isShowArea) {
          e.isShowArea = false
        }
        if (e.id === replyId) {
          e.isShowArea = true
        }
        return e
      })
      return newTopic2
    case 'UPS':
      const newTopic = { ...state }
      const { id, userId } = action
      if (action.action === 'up') {
        newTopic.replies.find(e => e.id === id).ups.push(userId)
      } else {
        newTopic.replies.find(e => e.id === id).ups = newTopic.replies
          .find(e => e.id === id)
          .ups.filter(e => e !== userId)
      }
      return newTopic
    case 'COLLECT':
      const newTopic3 = { ...state }
      newTopic3.is_collect = !newTopic3.is_collect
      return newTopic3

    default:
      return state
  }
}

export default topic
