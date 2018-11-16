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
      redirect: 'login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/request-list',
      name: 'requestList',
      component: RequestList,
      beforeEnter: (to, from, next) => {
        if (store.state.isUserLoggedIn) {
          next();
        }
      }
    },
    {
      path: '/request/:userId',
      name: 'request',
      component: LocationIdentifier,
      beforeEnter: (to, from, next) => {
        if (store.state.isUserLoggedIn) {
          next();
        }
      }
    }
  ]
})
