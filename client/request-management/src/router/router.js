import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import RequestList from '@/components/RequestList'
import Routing from '@/components/Routing/Routing'
import store from '@/store/store'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'requests'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/requests',
      name: 'requestList',
      component: RequestList,
      beforeEnter: (to, from, next) => {
        if (store.state.isUserLoggedIn) {
          next();
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/requests/:requestId',
      name: 'request',
      component: Routing,
      beforeEnter: (to, from, next) => {
        if (store.state.isUserLoggedIn) {
          next()
        } else {
          next('/login')
        }
      }
    }
  ]
})
