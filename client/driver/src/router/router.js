import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
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
      path: '/home',
      name: 'home',
      component: LocationIdentifier,
      beforeEnter: (to, from, next) => {
        if (store.state.isUserLoggedIn) {
          next();
        }
      }
    },
    // {
    //   path: '/requests/:requestId',
    //   name: 'request',
    //   component: LocationIdentifier,
    //   beforeEnter: (to, from, next) => {
    //     if (store.state.isUserLoggedIn) {
    //       next();
    //     }
    //   }
    // }
  ]
})
