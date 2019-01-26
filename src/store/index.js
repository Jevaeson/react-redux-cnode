import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

//store 就是redux存储state的地方
// createStore 是 redux 中创建 store 的方法
// createStore 接收一个函数作为参数 我们将这个函数叫做reducer
// reducer 函数内必须返回一个state作为store中的数据

const store = createStore(rootReducer, applyMiddleware(logger, thunk))

export default store
