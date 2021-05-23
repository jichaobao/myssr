import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Topics from '@components/Topic.vue'
import Test  from '@components/test/Test.vue'
Vue.use(VueRouter)

// const router = new VueRouter({
//   mode: "history",
//   routes
// })

//spa
//export default router

//ssr
//为了防止客户端服务端混了，不要使用单例模式
export function createRouter() {
  const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/topics',
      component: Topics
    },
    {
      path: '/test',
      component: Test
    },
    {
      path: '/about',
      name: 'About',
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  ]
  const router = new VueRouter({
    mode:"history",
    routes
  })
  return router
}

