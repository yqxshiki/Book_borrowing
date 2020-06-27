import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: "/about",
    children: [
      {
        path: '/about',
        name: 'about',
        meta: {
          title: "关于"
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
      { path: '/:path/list', name: "common-list", meta: { title: 'common' }, component: () => import("../views/Common_list.vue"), props: true }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import('../views/Login.vue')
  },
  {
    path: "/error",
    name: "404",
    component: () => import('../views/Error.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
