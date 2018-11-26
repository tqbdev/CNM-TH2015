import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import RequestList from '@/components/RequestList'
import LocationIdentifier from '@/components/LocationIdentifier/LocationIdentifier'
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
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/requests/:requestId',
      name: 'request',
      component: LocationIdentifier,
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
