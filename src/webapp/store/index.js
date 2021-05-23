import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from "./action"
import * as getters from "./getter"

const defaultState = {
  count: 0,
  topics: []
}

const inBorwser = typeof window != "undefined"
//在浏览器的生产环境中，会使用cdn的方式使用vuex
//if (!inBorwsers || process.env.NODE_ENV=="development") {
Vue.use(Vuex)
//}

//ssr一定要知道前端的那些请求是异步的，后端先把异步的请求执行完
let state = (inBorwser && window.__INITIAL_STATE__) || defaultState

const mutations = {
  INCREMENT: (state) => ++state.count,
  DECREMENT: (state) => --state.count,
  TOPICSLIST: (state, topics) => {
    state.topics = topics
  }
}

export function createStore() {
  const store = new Vuex.Store({
    state,
    actions,
    getters,
    mutations
  })
  return store
}
