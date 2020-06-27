import axios from 'axios'
import Vue from 'vue'
import router from './router/index'
import { getToken } from './lib/utils'
const http = axios.create({
  baseURL: process.env.VUE_APP_URL || '/api'
})

http.interceptors.request.use((config) => {
  if (getToken()) {
    config.headers.Authorization = 'Bearer' + " " + (getToken() || "")
  }
  return config;
}, (err) => {
  return Promise.reject(err)
})

http.interceptors.response.use((res) => {
  return res
}, (err) => {
  let msg = ""
  if (err) {
    if (err.response.status == 401) {
      msg = err.response.data.msg
    } else if (err.response.status == 400) {
      msg = err.response.data.errors
    }
    Vue.prototype.$message({
      type: "error",
      message: msg
    })
  }
  // if (err.response.status == 401 || err.response.status == 500) {
  //   router.push("/login")
  // }
  return Promise.reject(err)
})

export default http
