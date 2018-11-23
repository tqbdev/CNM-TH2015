import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Request from '@/components/Request'
import store from '@/store/store'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'request'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/request',
      name: 'request',
      component: Request,
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
