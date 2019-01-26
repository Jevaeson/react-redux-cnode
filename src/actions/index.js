// action的创建函数 创建action的函数 {type:xx}
import axios from 'axios'
export const getTopics = pathname => {
  return dispatch => {
    axios
      .get(`https://cnodejs.org/api/v1/topics?tab=${pathname.replace('/', '')}`)
      .then(res => {
        dispatch({ type: 'GET_TOPICS', topics: res.data.data })
      })
  }
}
export const pageChange = (pathname, page) => {
  return dispatch => {
    const url = `https://cnodejs.org/api/v1/topics?tab=${pathname.replace(
      '/',
      ''
    )}&page=${page}`
    axios.get(url).then(res => {
      dispatch({ type: 'GET_TOPICS', topics: res.data.data })
    })
  }
}
export const getTopic = (token, id) => {
  return dispatch => {
    axios
      .get(
        `https://cnodejs.org/api/v1/topic/${id}?${
          token ? `accesstoken=${token}` : ''
        }`
      )
      .then(res => {
        res.data.data.replies = res.data.data.replies.map(e => {
          e.isShowArea = false
          return e
        })
        dispatch({ type: 'GET_TOPIC', topic: res.data.data })
      })
  }
}
export const addComment = (topic, comment, token, id, getTopic, clearIuput) => {
  return dispatch => {
    axios
      .post(`https://cnodejs.org/api/v1//topic/${topic.id}/replies`, {
        accesstoken: token,
        content: comment
      })
      .then(res => {
        // dispatch({ type: 'ADD_COMMENT' })
        getTopic(token, id)
        clearIuput()
      })
  }
}
export const addOtherComment = (
  topic,
  otherComment,
  token,
  id,
  replyId,
  getTopic,
  clearIuput
) => {
  return dispatch => {
    axios
      .post(`https://cnodejs.org/api/v1//topic/${topic.id}/replies`, {
        accesstoken: token,
        content: otherComment,
        reply_id: replyId
      })
      .then(res => {
        getTopic(token, id)
        clearIuput()
      })
  }
}
export const ups = (token, id, userId) => {
  return dispatch => {
    axios
      .post(`https://cnodejs.org/api/v1/reply/${id}/ups`, {
        accesstoken: token
      })
      .then(res => {
        dispatch({
          type: 'UPS',
          action: res.data.action,
          id,
          userId
        })
      })
  }
}
export const showArea = replyId => {
  return dispatch => {
    dispatch({ type: 'SHOW_AREA', replyId })
  }
}
export const creatLogin = bool => {
  return dispatch => {
    dispatch({
      type: 'CREAT_LOGIN',
      isLogin: bool
    })
  }
}
export const getUserInfo = loginname => {
  return dispatch => {
    axios.get(`https://cnodejs.org/api/v1/user/${loginname}`).then(res => {
      dispatch({
        type: 'GET_USERINFO',
        userinfo: res.data.data
      })
    })
  }
}
export const collect = (id, token, isCollect) => {
  return dispatch => {
    axios
      .post(
        `https://cnodejs.org/api/v1/topic_collect/${
          isCollect ? 'de_collect' : 'collect'
        }`,
        {
          accesstoken: token,
          topic_id: id
        }
      )
      .then(() => {
        dispatch({
          type: 'COLLECT'
        })
      })
  }
}
// export const addComment = (newComment, clearIuput) => {
//   return dispatch => {
//     axios.post('http://localhost:3008/comments', newComment).then(res => {
//       dispatch({
//         type: 'ADD_COMMENT',
//         comment: res.data
//       })
//       clearIuput()
//     })
//   }
// }
// export const addComment = comment => {
//   return {
//     type: 'ADD_COMMENT',
//     comment
//   }
// }
// export const minComment = id => {
//   return dispatch => {
//     axios.delete(`http://localhost:3008/comments/${id}`).then(() => {
//       dispatch({
//         type: 'DEL_COMMENT',
//         id
//       })
//     })
//   }
// }
// export const minComment = id => {
//   return {
//     type: 'DEL_COMMENT',
//     id
//   }
// }
// export const getComments = id => {
//   return dispatch => {
//     axios.get(`http://localhost:3008/comments?postId=${id}`).then(res => {
//       dispatch({
//         type: 'GET_COMMENTS',
//         comments: res.data
//       })
//     })
//   }
// }
// export const getComments = comments => {
//   return {
//     type: 'GET_COMMENTS',
//     comments
//   }
// }

// export const getPosts = posts => {
//   return {
//     type: 'GET_POSTS',
//     posts
//   }
// }

// 不在组件内直接执行 异步请求 发action
// 把 异步请求封装到 action 内
// 需要 redux 中间件 redux-promise redux-thunk redux-sage
