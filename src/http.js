import axios from 'axios'
import Vue from 'vue'
import router from './router/index'

const http = axios.create({
  baseURL: process.env.VUE_APP_URL || '/api'
})

http.interceptors.request.use((config) => {
  if (sessionStorage.book_token) {
    config.headers.Authorization = 'Bearer' + " " + (sessionStorage.book_token || "")
  }
  return config;
}, (err) => {
  return Promise.reject(err)
})

http.interceptors.response.use((res) => {
  return res
}, (err) => {
  if (err.response.data.message) {
    Vue.prototype.$message({
      type: "error",
      message: err.response.data.message
    })
  }
  // if (err.response.status == 401 || err.response.status == 500) {
  //   router.push("/login")
  // }
  return Promise.reject(err)
})

export default http
