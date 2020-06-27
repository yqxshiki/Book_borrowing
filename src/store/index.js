import Vue from 'vue'
import Vuex from 'vuex'
import users from './user'
import tabNav from './tabNav'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getter: {

  },
  mutations: {
  },
  actions: {
  },
  modules: {
    users,
    tabNav
  }
})
