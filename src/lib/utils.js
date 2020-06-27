import cookies from 'js-cookie'
import { doCustomTimes, objEqual } from './tool'

export const setToken = ((token, tokenName = 'book_token') => {
  cookies.set(tokenName, token)
})

export const getToken = ((tokenName = 'book_token') => {
  return cookies.get(tokenName)
})

// 对比两个路由是否相等
export const routeEqual = (route1, route2) => {
  const params1 = route1.params || {}
  const params2 = route2.params || {}
  const query1 = route1.query || {}
  const query2 = route2.query || {}
  return route1.name === route2.name && objEqual(params1, params2) && objEqual(query1, query2)
}


// 是否有路由
export const routeHasExist = (tabList, routeItem) => {
  let len = tabList.length
  let res = false
  doCustomTimes(len, (index) => {
    if (routeEqual(tabList[index], routeItem)) res = true
  })
  return res
}



// 获取键值对数组
const getKeyValueArr = obj => {
  let arr = []
  Object.entries(obj).sort((a, b) => {
    return a[0] - b[0]
  }).forEach(([key, value]) => {
    arr.push(key, value)
  })
  return arr
}



export const getTabNameByRoute = route => {

  const { name, params, query } = route

  let res = name
  if (params && Object.keys(params).length) res += ':' + getKeyValueArr(params).join("_")
  if (query && Object.keys(query).length) res += '&' + getKeyValueArr(query).join("_")

  return res
}


const getObjBySplitStr = (id, splitStr) => {
  let splitArr = id.split(splitStr)
  let str = splitArr[splitArr.length - 1]
  let keyValArr = str.split('_')
  let res = {}
  let i = 0
  let len = keyValArr.length
  while (i < len) {
    res[keyValArr[i]] = keyValArr[i + 1]
    i += 2
  }
  return res
}

export const getRouteById = id => {
  let res = {}
  if (id.includes('&')) {
    res.query = getObjBySplitStr(id, '&')
    id = id.split('&')[0]
  }
  if (id.includes(':')) {
    res.params = getObjBySplitStr(id, ':')
    id = id.split(':')[0]
  }
  res.name = id
  return res
}

export const getOpenArrByName = (name, routerList) => {
  let arr = []
  routerList.some(item => {
    if (item.name === name) {
      arr.push(item.name)
      return true
    }
    if (item.children && item.children.length) {
      let childArr = getOpenArrByName(name, item.children)
      if (childArr.length) {
        arr = arr.concat(item.name, childArr)
        return true
      }
    }
  })
  return arr
}


export const localSave = (name, value) => {
  localStorage.setItem(name, value)
}

export const localRead = (name) => {
  return localStorage.getItem(name)
}