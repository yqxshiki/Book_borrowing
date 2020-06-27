import { routeHasExist, getRouteById, routeEqual, localRead, localSave } from '../lib/utils'

const state = {
  tabList: JSON.parse(localRead('tabList')) || []
}
const getTabListToLocal = tabList => {
  return tabList.map(item => {
    return {
      name: item.name,
      path: item.path,
      meta: item.meta,
      params: item.params,
      query: item.query
    }
  })
}

const mutations = {
  // 添加tab
  update_tabNav (state, route) {
    if (!routeHasExist(state.tabList, route)) state.tabList.push(route)
    localSave('tabList', JSON.stringify(getTabListToLocal(state.tabList)))
  },
  // 删除
  remove_tabNav (state, index) {
    state.tabList.splice(index, 1)
    localSave('tabList', JSON.stringify(getTabListToLocal(state.tabList)))
  }
}

const actions = {
  // 删除
  handleRemove ({ commit }, { id, $route }) {
    return new Promise((resolve) => {
      let route = getRouteById(id)
      let index = state.tabList.findIndex(item => {
        return routeEqual(route, item)
      })
      let len = state.tabList.length

      let nextRoute = {}

      if (routeEqual($route, state.tabList[index])) {
        if (index < len - 1) nextRoute = state.tabList[index + 1]
        else if (index == len - 1) nextRoute = state.tabList[index - 1]
      }
      const { name, params, query } = nextRoute || { name: 'about' }

      commit('remove_tabNav', index)

      resolve({
        name, params, query
      })
    })

  }
}

export default {
  state,
  mutations,
  actions
}